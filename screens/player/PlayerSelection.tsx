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


    // initialize
    const initializeCheckablePlayers = useCallback(() => {
        let initCheckablePlayers: Map<string, Status> = new Map();
        allPlayer.forEach((player) => {
            const thisStatus = unsavedScores.find((scoring) => scoring.playerId === player.id) === undefined
                ? 'unchecked'
                : 'checked'
            initCheckablePlayers.set(player.id, thisStatus)
        })
        return initCheckablePlayers
    }, [allPlayer])


    // states
    const [checkablePlayers, setCheckablePlayers] = useState<Map<string, Status>>(initializeCheckablePlayers);
    const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);
    const [scoringSheetId] = useState(Math.random().toString(36).substring(2));


    // methods
    const createNewScoringOfPlayer = useCallback(
        (playerId: string) => {
            dispatch(scoringActions.createScoring(scoringSheetId, playerId));
        },
        [dispatch, scoringSheetId]
    );

    const deleteScoringOfPlayer = useCallback(
        (playerId: string) => {
            const thisScoring = unsavedScores.find((scoring) => scoring.scoringSheetId === scoringSheetId && scoring.playerId === playerId) ??
                helpers.throwError(
                    `Error in SelectPlayers: no matching scoring with sheetId: ${scoringSheetId} and playerId: ${playerId} not in scoresOfSheet: ${JSON.stringify(
                        unsavedScores
                    )}`
                );
            dispatch(scoringActions.deleteScoring(thisScoring.id));
        },
        [dispatch, unsavedScores, scoringSheetId]
    );

    const indeterminateUnselectableFields = useCallback((updatedCheckablePlayers: Map<string, Status>) => {
        const sumCheckedPlayers = Array.from(updatedCheckablePlayers.values()).reduce((sum, status: Status) => sum + (status === "checked" ? 1 : 0), 0);
        if (sumCheckedPlayers === 4 && isIndeterminate) {
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers);
            updatedCheckablePlayers.forEach(
                (status: Status, playerId: string) => {
                    if (status === 'indeterminate') {
                        updatedCheckablePlayers.set(playerId, 'unchecked');
                    } else {
                        updatedCheckablePlayers.set(playerId, "checked");
                    }
                }
            );
            setCheckablePlayers(updatedCheckablePlayers);
            setIsIndeterminate(false);
        } else if (sumCheckedPlayers === 5 && !isIndeterminate) {
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers);
            console.log(updatedCheckablePlayers)
            updatedCheckablePlayers.forEach(
                (status: Status, playerId: string) => {
                    if (status === 'unchecked') {
                        updatedCheckablePlayers.set(playerId, 'indeterminate');
                    } else {
                        updatedCheckablePlayers.set(playerId, "checked");
                    }
                }
            );
            setCheckablePlayers(updatedCheckablePlayers);
            console.log(updatedCheckablePlayers)
        }
    }, [checkablePlayers, isIndeterminate]);

    const setOneCheckablePlayer = useCallback(
        (playerId: string) => {
            const updatedCheckablePlayers = new Map<string, Status>(
                checkablePlayers
            );
            if (checkablePlayers.get(playerId) === 'checked' && unsavedScores.length <= 5) {
                updatedCheckablePlayers.set(playerId, 'unchecked');
                deleteScoringOfPlayer(playerId);
            } else if (checkablePlayers.get(playerId) === 'unchecked' && unsavedScores.length < 5) {
                updatedCheckablePlayers.set(playerId, 'checked');
                createNewScoringOfPlayer(playerId);
            }
            setCheckablePlayers(updatedCheckablePlayers);
            indeterminateUnselectableFields(updatedCheckablePlayers)
        },
        [checkablePlayers, setCheckablePlayers, unsavedScores, createNewScoringOfPlayer, deleteScoringOfPlayer, indeterminateUnselectableFields]
    );



    // Button in Navigation
    const submitHandler = useCallback(() => {
        navigation.navigate('ScoringInput', {scoringSheetId: scoringSheetId});
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
        <View style={styles.main}>
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
                        <Text style={styles.defaultTextStyle}>
                            Noch keine Spieler vorhanden. Lege zuerst Spieler an.
                        </Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.buttonStyle}
                            icon={'account-plus'}
                            color={Colors.secondary}
                            onPress={() => {
                                navigation.navigate('PlayerEdit');
                            }}
                        >
                            Neuen Spieler anlegen
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 10
    },
    buttonContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryBackground,
        alignItems: 'center'
    },
    buttonStyle: {
        color: Colors.secondary,
        width: '90%'
    },
    defaultTextStyle: {
        textAlign: 'center',
        padding: 5
    }
});

export const screenOptions = ({navigation}) => {
    return {
        headerTitle: 'Spieler auswählen'
    };
};

export default PlayerSelection;