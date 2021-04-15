import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Text, Checkbox, Paragraph, IconButton} from 'react-native-paper'
import Player from "../../player/model/player";
import Status from "../model/CheckBoxStatus";
import CheckablePlayer from "./checkablePlayer";
import Colors from "../../../constants/Colors";


type Props = {
    allPlayer : Array<Player>
    setOneCheckablePlayer: (playerId : string) => void
    checkablePlayers: Map<string, Status>
};


const CheckablePlayers = ({allPlayer, setOneCheckablePlayer, checkablePlayers}: Props) => {

    const [isAdding, setIsAdding] = useState(false)

    return (
        <View>
            {
                allPlayer.length > 0 ?
                        allPlayer.map((player: Player) => {
                            return (
                                <CheckablePlayer
                                    key={player.id}
                                    player={player}
                                    setOneCheckablePlayer={setOneCheckablePlayer}
                                    status={checkablePlayers.get(player.id) ?? "unchecked"}
                                    setIsAdding={setIsAdding}
                                />
                            )
                        })
                     :
                    <Text style={styles.defaultTextStyle}>Noch keine Spieler vorhanden. Lege zuerst Spieler an.</Text>
            }
            {
                isAdding &&
                <CheckablePlayer
                    setOneCheckablePlayer={setOneCheckablePlayer}
                    status={"unchecked"}
                    setIsAdding={setIsAdding}
                />
            }
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.buttonStyle}
                    icon={"account-plus"}
                    color={Colors.secondary}
                    onPress={() => {
                        setIsAdding(true)
                    }}>
                    Neuen Spieler anlegen
                </Button>
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
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
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryBackground
    },
    buttonStyle: {
        color: Colors.secondary,
        width: "100%"
    },
    defaultTextStyle: {
        textAlign: 'center',
        padding: 5
    }

})

export default CheckablePlayers