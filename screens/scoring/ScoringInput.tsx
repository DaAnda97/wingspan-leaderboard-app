import React, { useCallback, useEffect } from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import ScoringInputColumn from './items/ScoringInputColumn';
import { Divider, IconButton, Text } from 'react-native-paper';
import {
    INPUT_REFS,
    SCORING_FIELD_NAMES
} from '../../models/scoring/SCORING_CONSTANTS';
import Colors from '../../constants/Colors';
import ScoringFieldName from '../../models/scoring/scoringFieldName';
import { RootState } from '../../stores/main/RootReducer';
import Scoring from '../../models/scoring/scoring';
import NameRow from './items/NameRow';
import * as scoringActions from '../../stores/scoring/scoringActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const ScoringInput = ({ navigation }) => {
    const dispatch = useDispatch();
    const names = SCORING_FIELD_NAMES;
    const inputRefs = INPUT_REFS;

    const gamingSheetId = useSelector((state: RootState) => state.scores.unsavedGameSheetId)
    const unsavedScores = useSelector((state: RootState) => state.scores.unsavedScores)

    const goToNext = (colIndex, playerIndex) => {
        if (playerIndex < unsavedScores.length - 1) {
            inputRefs[playerIndex + 1][colIndex].current?.focus();
        } else {
            if (colIndex < inputRefs[0].length - 1) {
                inputRefs[0][colIndex + 1].current?.focus();
            }
        }
    };

    const saveHandler = useCallback(() => {
        dispatch(scoringActions.saveScores(unsavedScores));
        navigation.popToTop();
    }, [unsavedScores]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={'content-save'}
                    color={Colors.primary}
                    size={30}
                    onPress={saveHandler}
                />
            )
        });
    }, [saveHandler]);

    return (
        <View style={styles.main}>
                <NameRow scores={unsavedScores} />

                <Divider />


            <ScrollView keyboardShouldPersistTaps={"handled"}>
                <View style={styles.scrollView}>
                    <View style={styles.categoryContainer}>
                        {names.map((name: ScoringFieldName, index: number) => {
                            return (
                                <View key={index + ''} style={styles.score}>
                                    <Text style={styles.textStyle}>
                                        {name.name}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {unsavedScores.map((scoring: Scoring, index: number) => {
                        return (
                            <ScoringInputColumn
                                key={scoring.id}
                                playerIndex={index}
                                playerId={scoring.playerId}
                                scoringId={scoring.id}
                                scoringSheetId={gamingSheetId}
                                inputRefs={inputRefs[index]}
                                goToNext={goToNext}
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.inactive,
        padding: 10,
        marginBottom: 5
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row'
    },
    categoryContainer: {
        width: 95,
        alignItems: 'flex-start'
    },
    score: {
        minHeight: 50,
        height: Dimensions.get('screen').height / 11,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        margin: 5,
    }
});

export const screenOptions = () => {
    return {
        headerTitle: 'Spielwertung'
    };
};

export default ScoringInput;
