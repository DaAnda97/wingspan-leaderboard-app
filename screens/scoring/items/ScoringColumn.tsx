import React from 'react';
import {Dimensions, StyleSheet, View, } from 'react-native';
import {Text} from 'react-native-paper';
import Scoring from "../../../models/scoring/scoring";

type Props = {
    scoring: Scoring;
    isPacificEnabled: boolean
};

const ScoringColumn = ({scoring, isPacificEnabled}: Props) => {

    return (
        <View style={styles.scoringColumn}>

            <View style={styles.score}>
                <Text style={styles.textStyle}>{scoring.roundPoints}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{scoring.bonusPoints}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{scoring.eggPoints}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{scoring.foodPoints}</Text>
            </View>
            {
                isPacificEnabled && (
                    <View style={styles.score}>
                        <Text style={styles.textStyle}>{scoring.nectarPoints}</Text>
                    </View>
                )
            }
            <View style={styles.score}>
                <Text style={styles.textStyle}>{scoring.birdPoints}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{scoring.cardPoints}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    scoringColumn: {
        flex: 1
    },
    score: {
        minHeight: 50,
        height: Dimensions.get('screen').height / 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        margin: 5,
    }
});

export default ScoringColumn;
