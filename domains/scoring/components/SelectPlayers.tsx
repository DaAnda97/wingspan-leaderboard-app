import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal} from "react-native-paper";
import Colors from "../../../constants/Colors";
import Player from "../../player/model/player";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../main/store/RootReducer";
import helpers from "../../../constants/Functions";
import Styles from "../../../constants/Styles";
import * as scoringActions from "../store/scoringActions"
import CheckablePlayers from "../../player/components/checkablePlayers";
import CheckablePlayer from "../../player/components/checkablePlayer";
import Status from "../../player/model/CheckBoxStatus";

type Props = {
    isAddPlayersShown: boolean
    setIsAddPlayersShown: (isShown: boolean) => void
    scoringSheetId: string
};


const SelectPlayers = ({isAddPlayersShown, setIsAddPlayersShown, scoringSheetId}: Props) => {
    const dispatch = useDispatch();
    const allPlayer = useSelector((state: RootState) => state.players.allPlayers)
    const scoresOfSheet = useSelector((state: RootState) => state.scores.allScores).filter(scoring => scoring.scoringSheetId === scoringSheetId)


    // initial
    const initialCheckablePlayers = useCallback(() => {
        let initCheckablePlayers: Map<string, Status> = new Map()
        allPlayer.forEach(player => {
            initCheckablePlayers.set(
                player.id,
                scoresOfSheet.find(scoring => scoring.playerId === player.id) == undefined ? "unchecked" : "checked"
            )
        })
        return initCheckablePlayers
    }, [allPlayer, scoresOfSheet])



    // states
    const [checkablePlayers, setCheckablePlayers] = useState<Map<string, Status>>(initialCheckablePlayers)
    const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false)


    // methods
    const createNewScoringPlayer = useCallback((playerId: string) => {
        dispatch(
            scoringActions.createScoring(scoringSheetId, playerId)
        );
    }, [dispatch, scoringSheetId]);

    const deleteScoringPlayer = useCallback((playerId: string) => {
        const thisScoring = scoresOfSheet.find(scoring => scoring.scoringSheetId === scoringSheetId && scoring.playerId === playerId)
            ?? helpers.throwError(`Error in SelectPlayers: no matching scoring with sheetId: ${scoringSheetId} and playerId: ${playerId} not in scoresOfSheet: ${JSON.stringify(scoresOfSheet)}`)
        dispatch(
            scoringActions.deleteScoring(thisScoring.id)
        );
    }, [dispatch, scoresOfSheet]);


    const setOneCheckablePlayer = useCallback((playerId: string) => {
        const updatedCheckablePlayers = new Map<string, Status>(checkablePlayers)
        if(checkablePlayers.get(playerId) === "checked" && scoresOfSheet.length <= 5){
            updatedCheckablePlayers.set(playerId, "unchecked")
            deleteScoringPlayer(playerId)
        }
        else if (checkablePlayers.get(playerId) === "unchecked" && scoresOfSheet.length < 5){
            updatedCheckablePlayers.set(playerId, "checked")
            createNewScoringPlayer(playerId)
        }
        setCheckablePlayers(updatedCheckablePlayers)
    }, [checkablePlayers, scoresOfSheet, createNewScoringPlayer, deleteScoringPlayer])


    const indeterminateUnselectableFields = useCallback(() => {
        if(scoresOfSheet.length == 4 && isIndeterminate){
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers)
            updatedCheckablePlayers.forEach((status: Status, playerId: string) => {
                if(status === "indeterminate"){
                    updatedCheckablePlayers.set(playerId, "unchecked")
                } else {
                    updatedCheckablePlayers.set(playerId, status)
                }
            })
            setCheckablePlayers(updatedCheckablePlayers)
            setIsIndeterminate(false)
        }
        else if(scoresOfSheet.length == 5 && !isIndeterminate){
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers)
            updatedCheckablePlayers.forEach((status: Status, playerId: string) => {
                if(status === "unchecked"){
                    updatedCheckablePlayers.set(playerId, "indeterminate")
                } else {
                    updatedCheckablePlayers.set(playerId, status)
                }
            })
            setCheckablePlayers(updatedCheckablePlayers)
            setIsIndeterminate(true)
        }
    }, [scoresOfSheet, checkablePlayers, setCheckablePlayers])




    useEffect(() => {
        indeterminateUnselectableFields()
    }, [indeterminateUnselectableFields, scoresOfSheet, checkablePlayers, setCheckablePlayers])

    return (
        <Portal>
            <Dialog visible={isAddPlayersShown} onDismiss={() => setIsAddPlayersShown(false)}>
                <Dialog.Title>Spieler auswählen</Dialog.Title>
                <Dialog.Content>

                    <View style={styles.content}>
                        <ScrollView>
                            <CheckablePlayers allPlayer={allPlayer} setOneCheckablePlayer={setOneCheckablePlayer} checkablePlayers={checkablePlayers} />
                        </ScrollView>
                    </View>

                </Dialog.Content>
                <Dialog.Actions>
                    <View style={{...Styles.centered, ...styles.buttonContainer}}>
                        <Button style={styles.buttonStyle} onPress={() => setIsAddPlayersShown(false)}>OK</Button>
                    </View>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}


const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        maxHeight: (Dimensions.get("screen").height / 3) * 2
    },
    buttonContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryBackground
    },
    buttonStyle: {
        color: Colors.primary,
        width: "100%"
    }
})

export default SelectPlayers