import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {Button, Checkbox, Dialog, Paragraph, Portal} from "react-native-paper";
import Colors from "../../../../constants/Colors";
import Player from "../../../player/model/player";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../main/store/RootReducer";
import TouchableComponent from "../../../../components/TouchableComponent";
import helpers from "../../../../constants/Functions";
import * as scoringActions from "../../store/scoringActions"

type Props = {
    isAddPlayersShown: boolean
    setIsAddPlayersShown: (isShown: boolean) => void
    scoringSheetId: string
};

type Status = "unchecked" | "indeterminate" | "checked";
class CheckablePlayer {
    constructor(
        public id : string,
        public name: string,
        public status: Status
    ) {
    }
}


const SelectPlayers = ({isAddPlayersShown, setIsAddPlayersShown, scoringSheetId}: Props) => {
    const dispatch = useDispatch();
    const allPlayer = useSelector((state: RootState) => state.players.allPlayer)
    const scoresOfSheet = useSelector((state: RootState) => state.scores.allScores).filter(scoring => scoring.scoringSheetId === scoringSheetId)


    // initial
    let initialCheckablePlayers: Array<CheckablePlayer> = []
    allPlayer.forEach(player => {
        initialCheckablePlayers.push(
            new CheckablePlayer(
                player.id,
                player.name,
                scoresOfSheet.find(scoring => scoring.playerId === player.id) == undefined ? "unchecked" : "checked"
            ))
    })


    // states
    const [checkablePlayers, setCheckablePlayers] = useState<Array<CheckablePlayer>>(initialCheckablePlayers)


    // methods
    const setOneCheckablePlayer = (playerId: string) => {
        const checkedPlayersSum : number = checkablePlayers.reduce((sum, {status}) => sum + (status === "checked" ? 1 : 0), 0)
        const selectedCheckablePlayer = checkablePlayers.find(checkablePlayer => checkablePlayer.id === playerId)
                ?? helpers.throwError("Error in SelectPlayers: playerId not in checkablePlayers")

        if(selectedCheckablePlayer.status === "checked" && checkedPlayersSum <= 5){
            const selectedScoring = scoresOfSheet.find(scoring => scoring.scoringSheetId === scoringSheetId && scoring.playerId === playerId)
                ?? helpers.throwError("Error in SelectPlayers: no matching scoring not in scoresOfSheet")

            updateCheckablePlayer(playerId, "unchecked")
            deleteScoringPlayer(selectedScoring.id)
        }
        else if (selectedCheckablePlayer.status === "unchecked" && checkedPlayersSum < 5){
            updateCheckablePlayer(playerId, "checked")
            createNewScoringPlayer(playerId)
        }


    }

    const updateCheckablePlayer = (playerId: string, newStatus: Status) => {
        const updatedIndex : number = checkablePlayers.findIndex(checkablePlayer => checkablePlayer.id === playerId)

        const updatedCheckablePlayer = new CheckablePlayer(
            playerId,
            checkablePlayers[updatedIndex].name,
            newStatus
        )

        const updatedCheckablePlayers = [...checkablePlayers]
        updatedCheckablePlayers[updatedIndex] = updatedCheckablePlayer

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
        const checkedPlayersSum : number = checkablePlayers.reduce((sum, {status}) => sum + (status === "checked" ? 1 : 0), 0)
        if(checkedPlayersSum == 5){
            checkablePlayers.filter(cPlayer => cPlayer.status === "unchecked")
                .forEach(cPlayer => {updateCheckablePlayer(cPlayer.id, "indeterminate")})
        }
        if(checkedPlayersSum == 4){
            checkablePlayers.filter(cPlayer => cPlayer.status === "indeterminate")
                .forEach(cPlayer => {updateCheckablePlayer(cPlayer.id, "unchecked")})
        }
    }, [checkablePlayers])




    useEffect(() => {
        indeterminateUnselectableFields()
    }, [indeterminateUnselectableFields])

    return (
        <Portal>
            <Dialog visible={isAddPlayersShown} onDismiss={() => setIsAddPlayersShown(false)}>
                <Dialog.Title>Spieler auswählen</Dialog.Title>
                <Dialog.Content >
                    <View style={styles.content}>
                        {
                            checkablePlayers.map((player: CheckablePlayer) => {
                                    return (
                                        <TouchableComponent key={player.id} style={styles.touchableContainer}
                                                            onPress={() => setOneCheckablePlayer(player.id)}>
                                            <View style={styles.verticalCentered}>
                                                <Paragraph>{player.name}</Paragraph>
                                            </View>
                                            <Checkbox.Android
                                                status={player.status}
                                                onPress={() => {setOneCheckablePlayer(player.id)}}
                                            />
                                        </TouchableComponent>
                                    )
                                }
                            )
                        }
                    </View>

                </Dialog.Content>
                <Dialog.Actions>
                    <Button color={Colors.primary} onPress={() => setIsAddPlayersShown(false)}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}


const styles = StyleSheet.create({
    content: {
        flexDirection: "column"
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
})

export default SelectPlayers