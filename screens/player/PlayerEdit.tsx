import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Dialog, IconButton, Paragraph, Portal, Text} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import i18n from 'i18n-js';
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
        <SafeAreaView>
            <Appbar.Header theme={{ colors: { primary: "white" } }}>
                <IconButton
                    icon={'menu'}
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
                <Appbar.Content
                    color={Colors.primary}
                    title={i18n.translate('player_overview')}
                />
                {
                    allHiddenPlayer.length > 0 &&
                    <IconButton
                        icon={'eye-off'}
                        color={Colors.primary}
                        size={23}
                        onPress={() => setIsHiddenPlayersShown(true)}
                    />
                }
            </Appbar.Header>

            <ScrollView keyboardShouldPersistTaps="handled">
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
                                {i18n.translate('show_players_message')}
                            </Text>
                        ) : (
                            <Text style={styles.defaultTextStyle}>
                                {i18n.translate('no_player_message')}
                            </Text>
                        )}
                    {isAdding ? (
                        <EditPlayer
                            players={allPlayer}
                            setIsAdding={setIsAdding}
                        />
                    ) : (
                        <View style={styles.cautionButtonContainer}>
                            <Button style={styles.cautionButtonStyle}
                                    icon={'account-plus'}
                                    color={Colors.secondary}
                                    onPress={() => {
                                        setIsAdding(true);
                                    }}
                            >
                                {i18n.translate('add_player_button')}
                            </Button>
                        </View>

                    )}
                </View>

                <Portal>
                    <Dialog
                        visible={isHiddenPlayersShown}
                        onDismiss={() => setIsHiddenPlayersShown(false)}
                    >
                        <Dialog.Title>{i18n.translate('hidden_player')}</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                {i18n.translate('hidden_player_info')}
                            </Paragraph>
                            <Paragraph>
                                {i18n.translate('show_player_info')}
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
                            <Button onPress={() => setIsHiddenPlayersShown(false)}>
                                Ok
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </SafeAreaView>


    );

};

const styles = StyleSheet.create({
    main: {
        marginTop: 10,
    },
    cautionButtonContainer: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryBackground,
        alignItems: 'center'
    },
    cautionButtonStyle: {
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

export default PlayerEdit;
