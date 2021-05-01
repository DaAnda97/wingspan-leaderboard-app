import React from 'react';
import i18n from 'i18n-js';
import {Dimensions, StyleSheet, View, } from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/main/RootReducer";

type Props = {
    isPacificEnabled: boolean
}

const PointCategoryContainer = ({isPacificEnabled}: Props) => {

    return (
        <View style={styles.scoringColumn}>

            <View style={styles.score}>
                <Text style={styles.textStyle}>{i18n.translate('end_of_round_goals')}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{i18n.translate('bonus_cards')}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{i18n.translate('eggs')}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{i18n.translate('food_on_cards')}</Text>
            </View>
            {
                isPacificEnabled && (
                    <View style={styles.score}>
                        <Text style={styles.textStyle}>{i18n.translate('nectar')}</Text>
                    </View>
                )
            }
            <View style={styles.score}>
                <Text style={styles.textStyle}>{i18n.translate('birds')}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.textStyle}>{i18n.translate('tucked_cards')}</Text>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textStyle: {
        margin: 5,
        textAlign: 'left'
    }
});

export default PointCategoryContainer;



















