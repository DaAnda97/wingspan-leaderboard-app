import React, {useCallback, useState} from 'react';
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

    players: Array<Player>
    setPlayers: (selectedPlayers: Array<Player>) => void
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


const SelectPlayers = ({isAddPlayersShown, setIsAddPlayersShown, scoringSheetId, players, setPlayers}: Props) => {
    const dispatch = useDispatch();
    const allPlayer = useSelector((state: RootState) => state.players.allPlayer)


    // initial
    let initialCheckablePlayers: Array<CheckablePlayer> = []
    allPlayer.forEach(player => {
        initialCheckablePlayers.push(
            new CheckablePlayer(
                player.id,
                player.name,
                players.includes(player) ? "checked" : "unchecked"))
    })


    // states
    const [checkablePlayers, setCheckablePlayers] = useState<Array<CheckablePlayer>>(initialCheckablePlayers)


    // methods
    const setOneCheckablePlayer = (playerId: string) => {
        const checkedPlayersSum = checkablePlayers.reduce((sum, {status}) => sum + (status === "checked" ? 1 : 0), 0)
        const updatedIndex = checkablePlayers.findIndex(checkablePlayer => checkablePlayer.id === playerId)

        if(checkedPlayersSum < 5 || (checkedPlayersSum == 5 && checkablePlayers[updatedIndex].status === "checked")){
            const updatedCheckablePlayer = new CheckablePlayer(
                playerId,
                checkablePlayers[updatedIndex].name,
                checkablePlayers[updatedIndex].status === "checked" ? "unchecked" : "checked"
            )

            const updatedCheckablePlayers = [...checkablePlayers]
            updatedCheckablePlayers[updatedIndex] = updatedCheckablePlayer

            setCheckablePlayers(updatedCheckablePlayers)
        }
    }

    const onSubmit = () => {
        let updatedPlayers : Array<Player> = []
        checkablePlayers.forEach( (checkablePlayer : CheckablePlayer) => {
            if(checkablePlayer.status === "checked"){
                const playerToAdd : Player = allPlayer.find(player => player.id === checkablePlayer.id)
                    ?? helpers.throwError("Error in Player id")
                updatedPlayers = [...updatedPlayers, playerToAdd]
            }
        })

        setPlayers(updatedPlayers)
        updatedPlayers.forEach( (player: Player) => {createNewScoringPlayer(player.id)})

        setIsAddPlayersShown(false)
    }

    const createNewScoringPlayer = useCallback((playerId: string) => {
        dispatch(
            scoringActions.createScoring(scoringSheetId, playerId)
        );
    }, [dispatch]);


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
                    <Button onPress={() => setIsAddPlayersShown(false)}>Abbrechen</Button>
                    <Button color={Colors.primary} onPress={onSubmit}>Bestätigen</Button>
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