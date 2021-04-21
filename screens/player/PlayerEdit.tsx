import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, IconButton, Paragraph, Portal, Text} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import EditPlayer from "./items/editPlayer";
import Player from "../../models/player/player";
import Colors from '../../constants/Colors';
import * as playerActions from "../../stores/player/playerActions";

const PlayerEdit = ({navigation}) => {
    const dispatch = useDispatch();
    const allPlayer = useSelector((state: RootState) => state.players.allPlayers);
    const allActivePlayer = allPlayer.filter((player) => player.isActive)
    const allHiddenPlayer = allPlayer.filter((player) => !player.isActive)
    const [isHiddenPlayersShown, setIsHiddenPlayersShown] = useState(false)

    // states
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if(allHiddenPlayer.length > 0){
                    return(
                        <IconButton
                            icon={'eye-off'}
                            color={Colors.primary}
                            size={23}
                            onPress={() => setIsHiddenPlayersShown(true)}
                        />
                    )
                }
            }
        });
    }, [allHiddenPlayer]);

    const showPlayer = useCallback((playerId, playerName) => {
        dispatch(
            playerActions.updatePlayer(
                new Player(playerId, playerName, true)
            )
        );
    }, [dispatch]);

    return (
        <ScrollView>
            <View style={styles.main}>
                {allActivePlayer.length > 0 ? (
                    allActivePlayer.map((player: Player) => {
                        return (
                            <EditPlayer
                                key={player.id}
                                player={player}
                                players={allPlayer}
                                setIsAdding={setIsAdding}
                            />
                        );
                    })
                ) : allPlayer.length > 0
                    ? (
                        <Text style={styles.defaultTextStyle}>
                            Keine aktiven Spieler. Blende deine Spieler über den Button rechts oben wieder ein oder lege neue Spieler an.
                        </Text>
                    ) : (
                        <Text style={styles.defaultTextStyle}>
                            Noch keine Spieler vorhanden. Lege zuerst Spieler an.
                        </Text>
                    )}
                {isAdding ? (
                    <EditPlayer
                        players={allPlayer}
                        setIsAdding={setIsAdding}
                    />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button style={styles.buttonStyle}
                                icon={'account-plus'}
                                color={Colors.secondary}
                                onPress={() => {
                                    setIsAdding(true);
                                }}
                        >
                            Neuen Spieler anlegen
                        </Button>
                    </View>

                )}
            </View>

            <Portal>
                <Dialog
                    visible={isHiddenPlayersShown}
                    onDismiss={() => setIsHiddenPlayersShown(false)}
                >
                    <Dialog.Title>Ausgeblendete Spieler</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Ausgeblendete Spieler werden nicht bei der Spielerauswahl angezeigt. So brauchst du inaktive Spieler nicht zu löschen, was wiederum die Ergebnislisten verfälschen würde.
                        </Paragraph>
                        <Paragraph>
                            Klicke auf das Auge, um den ausgewählten Spieler wieder einzublenden.
                        </Paragraph>
                        <ScrollView>
                            <View style={styles.verticalAligned}>
                                {
                                    allHiddenPlayer.map((player: Player) => {
                                            return (
                                                <View style={styles.mainContainer} key={player.id}>
                                                    <IconButton
                                                        size={23}
                                                        icon={'eye'}
                                                        color={Colors.secondary}
                                                        onPress={() => {
                                                            showPlayer(player.id, player.name)
                                                        }}
                                                    />
                                                    <View style={styles.nameContainer}>
                                                        <Paragraph>{player.name}</Paragraph>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    )
                                }
                            </View>
                        </ScrollView>

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => setIsHiddenPlayersShown(false)}
                        >
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>

    );

};

const styles = StyleSheet.create({
    main: {
        marginTop: 10,
    },
    buttonContainer: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryBackground,
        alignItems: 'center'
    },
    buttonStyle: {
        color: Colors.secondary,
        width: '100%'
    },
    defaultTextStyle: {
        textAlign: 'center',
        padding: 5
    },
    verticalAligned: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    verticalCentered: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: '#bbb',
    },
});

export const screenOptions = () => {
    return {
        headerTitle: 'Spieler bearbeiten'
    };
};

export default PlayerEdit;
