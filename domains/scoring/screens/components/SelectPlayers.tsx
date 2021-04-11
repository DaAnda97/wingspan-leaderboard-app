import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Checkbox, Dialog, Paragraph, Portal} from "react-native-paper";
import Colors from "../../../../constants/Colors";
import Player from "../../../player/model/player";
import {useSelector} from "react-redux";
import {RootState} from "../../../main/store/RootReducer";
import TouchableComponent from "../../../../components/TouchableComponent";

type Props = {
    isAddPlayersShown: boolean
    setIsAddPlayersShown: (isShown: boolean) => void

    players: Array<Player>
    setPlayers: (selectedPlayers: Array<Player>) => void
};

const SelectPlayers = ({isAddPlayersShown, setIsAddPlayersShown, players, setPlayers}: Props) => {
    const allPlayer = useSelector((state: RootState) => state.players.allPlayer)

    let initialCheckablePlayers: Map<string, boolean> = new Map()
    allPlayer.forEach(player => {
        initialCheckablePlayers.set(player.id, players.includes(player))
    })

    const [checkablePlayers, setCheckablePlayers] = useState<Map<string, boolean>>(initialCheckablePlayers)

    const setOneCheckablePlayer = (playerId: string, updatedIsChecked: boolean) => {
        const updatedCheckablePlayers = new Map(checkablePlayers)
        updatedCheckablePlayers.set(playerId, updatedIsChecked)

        setCheckablePlayers(updatedCheckablePlayers)
    }


    return (
        <Portal>
            <Dialog visible={isAddPlayersShown} onDismiss={() => setIsAddPlayersShown(false)}>
                <Dialog.Title>Spieler auswählen</Dialog.Title>
                <Dialog.Content >
                    <View style={styles.content}>
                        {
                            allPlayer.map((player: Player) => {
                                    return (
                                        <TouchableComponent key={player.id} style={styles.touchableContainer}
                                                            onPress={() => setOneCheckablePlayer(player.name, !checkablePlayers.get(player.id))} >
                                            <View style={styles.verticalCentered}>
                                                <Paragraph>{player.name}</Paragraph>
                                            </View>
                                            <Checkbox.Android
                                                status={checkablePlayers.get(player.id) ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setOneCheckablePlayer(player.name, !checkablePlayers.get(player.id));
                                                }}
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
                    <Button color={Colors.primary} onPress={() => setPlayers([])}>Bestätigen</Button>
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
    }
})

export default SelectPlayers