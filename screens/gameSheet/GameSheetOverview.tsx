import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import * as playerActions from '../../stores/player/playerActions';
import * as scoringActions from '../../stores/scoring/scoringActions';
import * as gameSheetActions from '../../stores/gameSheet/gameSheetActions';
import Styles from '../../constants/Styles';
import {ActivityIndicator, Button, Divider, IconButton, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Colors from "../../constants/Colors";
import {RootState} from "../../stores/main/RootReducer";
import GameSheet from "../../models/gameSheet/gameSheet";
import GameSheetItem from "./items/GameSheetItem";
import i18n from 'i18n-js';
import * as settingsActions from "../../stores/settings/settingsActions";


const GameSheetOverview = ({navigation}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const savedScores = useSelector((state : RootState) => state.scores.savedScores)
    const savedGameSheets = useSelector((state : RootState) => state.gameSheets.gameSheets)
    const allPlayer = useSelector((state : RootState) => state.players.allPlayers)

    const loadFromDb = useCallback(() => {
        try {
            setIsLoading(true)
            dispatch(playerActions.loadPlayersFromDb());
            dispatch(scoringActions.loadScoresFromDb());
            dispatch(gameSheetActions.loadGameSheetsFromDb())
        } catch (err) {
            throw new Error(err);
        }
        setIsLoading(false);
    }, [dispatch, savedScores, savedGameSheets, gameSheetActions, isLoading]);

    useEffect(() => {
        return navigation.addListener('focus', loadFromDb)
    }, [dispatch, loadFromDb, savedScores, savedGameSheets, allPlayer, i18n])

    useEffect(() => {
        dispatch (
            settingsActions.initSettings()
        )
    }, []) // initial


    // Button in Navigation
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <IconButton
                    icon={'menu'}
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
            )
        });
    }, []);


    if (isLoading) {
        return (
            <View style={Styles.centered}>
                <ActivityIndicator animating={true}/>
                <Text>{i18n.translate('refreshing')}</Text>
            </View>
        );
    }
    return (
        <View style={styles.wholeSpace}>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.buttonStyle}
                    icon={'plus'}
                    color={Colors.secondary}
                    onPress={() => {
                        navigation.navigate('PlayerSelection');
                    }}
                >
                    {i18n.translate('add_scoring')}
                </Button>
            </View>
            <Divider/>
            <View style={styles.wholeSpace}>
                <ScrollView>
                    <View>
                        {savedGameSheets.length > 0 ? (
                            savedGameSheets.map((gameSheet: GameSheet) => {
                                return (
                                    <GameSheetItem
                                        key={gameSheet.id}
                                        gameSheetItem={gameSheet}
                                        allScores={savedScores}
                                        allPlayer={allPlayer}
                                        onPress={() => {navigation.navigate('ScoringOverview', {gameSheetId: gameSheet.id})}}
                                    />
                                );
                            })
                        ) : (
                            <Text style={styles.defaultTextStyle}>
                                {i18n.translate('no_scoring')}
                            </Text>
                        )}
                    </View>
                </ScrollView>
            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    wholeSpace: {
        flex: 1
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
});

export default GameSheetOverview;
