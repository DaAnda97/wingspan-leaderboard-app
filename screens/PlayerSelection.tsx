import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import CheckablePlayers from '../components/player/checkablePlayers';
import * as playerActions from '../stores/player/playerActions';
import Styles from '../constants/Styles';
import {ActivityIndicator, IconButton, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';

const PlayerSelection = ({navigation}) => {
    const dispatch = useDispatch();
    const [scoringSheetId] = useState(Math.random().toString(36).substring(2));

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
                <CheckablePlayers scoringSheetId={scoringSheetId}/>
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 10
    }
});

export const screenOptions = ({navigation}) => {
    return {
        headerTitle: 'Spieler auswählen'
    };
};

export default PlayerSelection;
