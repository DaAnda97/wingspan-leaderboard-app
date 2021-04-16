import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../constants/Colors";
import CheckablePlayers from "../components/player/checkablePlayers";
import {SafeAreaView} from "react-native-safe-area-context";
import * as playerActions from "../stores/player/playerActions";
import Styles from "../constants/Styles";
import {ActivityIndicator, IconButton, Text} from "react-native-paper";
import {useDispatch} from "react-redux";

const PlayerSelection = ({navigation}) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [scoringSheetId] = useState(Math.random().toString(36).substring(2))

    const loadPlayers = useCallback(() => {
        try {
            dispatch(playerActions.loadPlayersFromDb())
        } catch (err) {
            throw new Error(err)
        }
        setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        loadPlayers()
    }, [dispatch, loadPlayers])




    const submitHandler = useCallback(() => {
        navigation.navigate('ScoringInput', {scoringSheetId: scoringSheetId})
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={"check"}
                    color={Colors.primary}
                    size={30}
                    onPress={submitHandler}
                />
            )
        });
    }, [submitHandler]);






    if (isLoading) {
        return (
            <View style={Styles.centered}>
                <ActivityIndicator animating={true}/>
                <Text>Lade Spieler</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.main}>
                <ScrollView>
                    <CheckablePlayers scoringSheetId={scoringSheetId}/>
                </ScrollView>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
})


export const screenOptions = ({navigation}) => {
    return {
        headerTitle: 'Spieler auswählen',
    };
};

export default PlayerSelection;