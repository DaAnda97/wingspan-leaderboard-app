import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Checkbox, Dialog, Paragraph, Portal} from "react-native-paper";
import Colors from "../../../../constants/Colors";
import Player from "../../../player/model/player";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../main/store/RootReducer";
import TouchableComponent from "../../../../components/TouchableComponent";
import helpers from "../../../../constants/Functions";
import Styles from "../../../../constants/Styles";
import * as scoringActions from "../../store/scoringActions"

type Props = {
    isAddPlayersShown: boolean
    setIsAddPlayersShown: (isShown: boolean) => void
    scoringSheetId: string
};

type Status = "unchecked" | "indeterminate" | "checked";


const SelectPlayers = ({isAddPlayersShown, setIsAddPlayersShown, scoringSheetId}: Props) => {
    const dispatch = useDispatch();
    const allPlayer = useSelector((state: RootState) => state.players.allPlayer)
    const scoresOfSheet = useSelector((state: RootState) => state.scores.allScores).filter(scoring => scoring.scoringSheetId === scoringSheetId)


    // initial
    let initialCheckablePlayers: Map<string, Status> = new Map()
    allPlayer.forEach(player => {
        initialCheckablePlayers.set(
            player.id,
            scoresOfSheet.find(scoring => scoring.playerId === player.id) == undefined ? "unchecked" : "checked"
        )
    })


    // states
    const [checkablePlayers, setCheckablePlayers] = useState<Map<string, Status>>(initialCheckablePlayers)
    const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false)

    console.log(checkablePlayers)

    // methods
    const setOneCheckablePlayer = (playerId: string) => {
        const updatedCheckablePlayers = new Map<string, Status>(checkablePlayers)
        if(checkablePlayers.get(playerId) === "checked" && scoresOfSheet.length <= 5){
            const selectedScoring = scoresOfSheet.find(scoring => scoring.scoringSheetId === scoringSheetId && scoring.playerId === playerId)
                ?? helpers.throwError("Error in SelectPlayers: no matching scoring not in scoresOfSheet")

            updatedCheckablePlayers.set(playerId, "unchecked")
            deleteScoringPlayer(selectedScoring.id)
        }
        else if (checkablePlayers.get(playerId) === "unchecked" && scoresOfSheet.length < 5){
            updatedCheckablePlayers.set(playerId, "checked")
            createNewScoringPlayer(playerId)
        }
        setCheckablePlayers(updatedCheckablePlayers)
    }



    const createNewScoringPlayer = useCallback((playerId: string) => {
        dispatch(
            scoringActions.createScoring(scoringSheetId, playerId)
        );
    }, [dispatch]);

    const deleteScoringPlayer = useCallback((scoringId: string) => {
        dispatch(
            scoringActions.deleteScoring(scoringId)
        );
    }, [dispatch]);

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
                <Dialog.Content >

                    <View style={styles.content}>
                        <ScrollView>
                        {
                            allPlayer.map((player: Player) => {
                                    return (
                                        <TouchableComponent key={player.id} style={styles.touchableContainer}
                                                            onPress={() => setOneCheckablePlayer(player.id)}>
                                            <View style={styles.verticalCentered}>
                                                <Paragraph>{player.name}</Paragraph>
                                            </View>
                                            <Checkbox.Android
                                                status={checkablePlayers.get(player.id) ?? "unchecked"}
                                                onPress={() => {setOneCheckablePlayer(player.id)}}
                                            />
                                        </TouchableComponent>
                                    )
                                }
                            )
                        }
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
    touchableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 0,
        borderRadius: 10,
        marginVertical: 3,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: "#bbb",
        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible',
    },
    verticalCentered: {
        flexDirection: 'row',
        alignItems: 'center',
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