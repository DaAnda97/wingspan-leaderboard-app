import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import { Divider, Text } from 'react-native-paper';
import {
    SCORING_FIELD_NAMES
} from '../../models/scoring/SCORING_CONSTANTS';
import Colors from '../../constants/Colors';
import ScoringFieldName from '../../models/scoring/scoringFieldName';
import { RootState } from '../../stores/main/RootReducer';
import Scoring from '../../models/scoring/scoring';
import NameRow from './items/NameRow';
import ScoringColumn from "./items/ScoringColumn";

const ScoringOverview = ({ navigation, route }) => {
    const scoringFieldNames = SCORING_FIELD_NAMES;

    const scores = useSelector((state: RootState) => state.scores.savedScores).filter((score : Scoring) => score.gameSheetId === route.params.gameSheetId)

    return (
        <View style={styles.main}>
            <NameRow scores={scores} />

            <Divider />

            <View>
                <View style={styles.scrollView}>
                    <View style={styles.categoryContainer}>
                        {scoringFieldNames.map((name: ScoringFieldName, index: number) => {
                            return (
                                <View key={'scoreFieldName_' + index} style={styles.score}>
                                    <Text style={styles.textStyle}>
                                        {name.name}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {scores.map((scoring: Scoring) => {
                        return (
                            <ScoringColumn
                                key={scoring.id}
                                scoring={scoring}
                            />
                        );
                    })}
                </View>
            </View>
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
        alignItems: "center",
        justifyContent: 'center',
    },
    textStyle: {
        margin: 5,
    }
});

export const screenOptions = () => {
    return {
        headerTitle: 'Spielübersicht'
    };
};

export default ScoringOverview;
