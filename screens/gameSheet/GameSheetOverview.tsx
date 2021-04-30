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
                <Text>Aktualisiere</Text>
            </View>
        );
    }
    return (
        <View>
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
    );

};

const styles = StyleSheet.create({
    main: {
        marginTop: 15,
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

export const screenOptions = () => {
    return {
        headerTitle: i18n.translate('score_overview')
    };
};

export default GameSheetOverview;
