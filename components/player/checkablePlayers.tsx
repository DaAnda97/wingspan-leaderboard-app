import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Text, Checkbox, Paragraph, IconButton, ActivityIndicator} from 'react-native-paper'
import Player from "../../models/player/player";
import Status from "../../models/player/CheckBoxStatus";
import CheckablePlayer from "./checkablePlayer";
import Colors from "../../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import * as playerActions from "../../stores/player/playerActions";
import Styles from "../../constants/Styles"


type Props = {
    setOneCheckablePlayer: (playerId : string) => void
    checkablePlayers: Map<string, Status>
};

const CheckablePlayers = ({setOneCheckablePlayer, checkablePlayers}: Props) => {
    const dispatch = useDispatch()
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const allPlayer = useSelector((state: RootState) => state.players.allPlayers).filter(player => player.isActive)


    const loadPlayers = useCallback(() => {
        try {
            dispatch(playerActions.loadPlayersFromDb())
        } catch (err) {
            throw new Error(err)
        }
        setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        loadPlayers()
    }, [dispatch, loadPlayers])

    if (isLoading) {
        return (
            <View style={Styles.centered}>
                <ActivityIndicator animating={true}/>
                <Text>Lade Spieler</Text>
            </View>
        )
    } else {
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
                        <Text style={styles.defaultTextStyle}>Noch keine Spieler vorhanden. Lege zuerst Spieler
                            an.</Text>
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