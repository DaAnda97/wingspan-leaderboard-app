import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Colors from '../../constants/Colors';
import {Button, IconButton, Text} from 'react-native-paper';
import Player from "../../models/player/player";
import CheckablePlayer from "./items/checkablePlayer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import Status from "../../models/player/CheckBoxStatus";
import * as scoringActions from "../../stores/scoring/scoringActions";
import helpers from "../../constants/Functions";

const PlayerSelection = ({navigation}) => {
    const dispatch = useDispatch();

    const allPlayer = useSelector((state: RootState) => state.players.allPlayers).filter((player) => player.isActive);
    const unsavedScores = useSelector((state: RootState) => state.scores.unsavedScores)
    const gamingSheetId = useSelector((state: RootState) => state.scores.unsavedGameSheetId)
    const settings = useSelector((state: RootState) => state.settings)


    // states
    const [checkablePlayers, setCheckablePlayers] = useState<Map<string, Status>>(new Map());
    const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);


    // dispatch
    const createNewScoringOfPlayer = useCallback(
        (playerId: string) => {
            dispatch(scoringActions.createScoring(gamingSheetId, playerId, settings.isPacificEnabled));
        },
        [dispatch, gamingSheetId]
    );

    const deleteScoringOfPlayer = useCallback(
        (playerId: string) => {
            const thisScoring = unsavedScores.find((scoring) => scoring.gameSheetId === gamingSheetId && scoring.playerId === playerId) ??
                helpers.throwError(
                    `Error in SelectPlayers: no matching scoring with sheetId: ${gamingSheetId} and playerId: ${playerId} not in scoresOfSheet: ${JSON.stringify(
                        unsavedScores
                    )}`
                );
            dispatch(scoringActions.removeScoring(thisScoring.id));
        },
        [dispatch, unsavedScores, gamingSheetId]
    );

    // methods
    const initializeCheckablePlayers = useCallback(() => {
        let initCheckablePlayers: Map<string, Status> = new Map();
        allPlayer.forEach((player) => {
            const thisStatus = unsavedScores.find((scoring) => scoring.playerId === player.id) === undefined
                ? 'unchecked'
                : 'checked'
            initCheckablePlayers.set(player.id, thisStatus)
        })
        setCheckablePlayers(initCheckablePlayers)
    }, [allPlayer, unsavedScores])


    const setOneCheckablePlayer = useCallback(
        (playerId: string) => {
            const updatedCheckablePlayers = new Map<string, Status>(checkablePlayers);
            if (checkablePlayers.get(playerId) === 'checked' && unsavedScores.length <= 5) {
                updatedCheckablePlayers.set(playerId, 'unchecked');
                deleteScoringOfPlayer(playerId);
            } else if (checkablePlayers.get(playerId) === 'unchecked' && unsavedScores.length < 5) {
                updatedCheckablePlayers.set(playerId, 'checked');
                createNewScoringOfPlayer(playerId);
            }
            setCheckablePlayers(updatedCheckablePlayers);
        },
        [checkablePlayers, setCheckablePlayers, unsavedScores, createNewScoringOfPlayer, deleteScoringOfPlayer]
    );


    const indeterminateUnselectableFields = useCallback( () => {
        const sumCheckedPlayers = Array.from(checkablePlayers.values()).reduce((sum, status: Status) => sum + (status === "checked" ? 1 : 0), 0);
        if (sumCheckedPlayers === 4 && isIndeterminate) {
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers);
            updatedCheckablePlayers.forEach(
                (status: Status, playerId: string) => {
                    if (status === 'indeterminate') {
                        updatedCheckablePlayers.set(playerId, 'unchecked');
                    } else {
                        updatedCheckablePlayers.set(playerId, status);
                    }
                }
            );
            setCheckablePlayers(updatedCheckablePlayers);
            setIsIndeterminate(false);
        } else if (sumCheckedPlayers === 5 && !isIndeterminate) {
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers);
            updatedCheckablePlayers.forEach(
                (status: Status, playerId: string) => {
                    if (status === 'unchecked') {
                        updatedCheckablePlayers.set(playerId, 'indeterminate');
                    } else {
                        updatedCheckablePlayers.set(playerId, status);
                    }
                }
            );
            setCheckablePlayers(updatedCheckablePlayers);
            setIsIndeterminate(true)
        }
    }, [checkablePlayers, isIndeterminate]);





    // effects
    useEffect(() => {
        return navigation.addListener('focus', initializeCheckablePlayers)
    }, [dispatch, initializeCheckablePlayers, allPlayer, unsavedScores])

    useEffect(() => {
        indeterminateUnselectableFields()
    }, [checkablePlayers])




    // Button in Navigation
    const submitHandler = useCallback(() => {
        navigation.navigate('ScoringInput', {scoringSheetId: gamingSheetId});
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={'check'}
                    color={Colors.primary}
                    size={30}
                    onPress={submitHandler}
                />
            )
        });
    }, [submitHandler]);



    return (
            <ScrollView>
                <View style={styles.main}>
                    {allPlayer.length > 0 ? (
                        allPlayer.map((player: Player) => {
                            return (
                                <CheckablePlayer
                                    key={player.id}
                                    player={player}
                                    setOneCheckablePlayer={setOneCheckablePlayer}
                                    status={
                                        checkablePlayers.get(player.id) ?? 'unchecked'
                                    }
                                />
                            );
                        })
                    ) : (
                        <View>
                            <Text style={styles.defaultTextStyle}>
                                Noch keine Spieler vorhanden. Lege in der Spielerübersicht zuerst Spieler an.
                            </Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.buttonStyle}
                                    icon={'menu'}
                                    onPress={() => {
                                        navigation.openDrawer();
                                    }}
                                >
                                    Menü öffnen
                                </Button>
                            </View>
                        </View>

                    )}
                </View>
            </ScrollView>
    );

};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 5
    },
    buttonContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryBackground,
        alignItems: 'center'
    },
    buttonStyle: {
        color: Colors.primary,
        width: '100%'
    },
    defaultTextStyle: {
        textAlign: 'center',
        padding: 5
    }
});


export default PlayerSelection;
