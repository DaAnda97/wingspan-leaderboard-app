import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import * as playerActions from '../../stores/player/playerActions';
import * as scoringActions from '../../stores/scoring/scoringActions';
import * as gameSheetActions from '../../stores/gameSheet/gameSheetActions';
import Styles from '../../constants/Styles';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Colors from "../../constants/Colors";
import {RootState} from "../../stores/main/RootReducer";
import Scoring from "../../models/scoring/scoring";
import GameSheet from "../../models/gameSheet/gameSheet";

const GameSheetOverview = ({navigation}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const savedScores = useSelector((state : RootState) => state.scores.savedScores)
    const savedGameSheets = useSelector((state : RootState) => state.gameSheets.gameSheets)

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric' };


    const loadFromDb = useCallback(() => {
        try {
            dispatch(playerActions.loadPlayersFromDb());
            dispatch(scoringActions.loadScoresFromDb());
            dispatch(gameSheetActions.loadGameSheetsFromDb())
        } catch (err) {
            throw new Error(err);
        }
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        return navigation.addListener('focus', loadFromDb)
    }, [dispatch, loadFromDb])


    if (isLoading) {
        return (
            <View style={Styles.centered}>
                <ActivityIndicator animating={true}/>
                <Text>Lade Spieler</Text>
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
                    Neue Spielwertung eintragen
                </Button>
            </View>
            <ScrollView>
                <View style={styles.main}>
                    {savedGameSheets.length > 0 ? (
                        savedGameSheets.map((gameSheet: GameSheet) => {
                            return (
                                <View key={gameSheet.id} style={styles.gameSheetContainer}>
                                    <Text>{gameSheet.timestamp.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} um </Text>
                                    <Text>{gameSheet.timestamp.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' })} Uhr</Text>
                                </View>

                            );
                        })
                    ) : (
                        <Text style={styles.defaultTextStyle}>
                            Noch keine Spielwertung erfasst.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>




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
    gameSheetContainer: {
        flexDirection: "row"
    }
});

export const screenOptions = () => {
    return {
        headerTitle: 'Spielwertungen'
    };
};

export default GameSheetOverview;
