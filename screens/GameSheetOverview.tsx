import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as playerActions from '../stores/player/playerActions';
import Styles from '../constants/Styles';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';

const GameSheetOverview = ({navigation}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const loadPlayers = useCallback(() => {
        try {
            dispatch(playerActions.loadPlayersFromDb());
        } catch (err) {
            throw new Error(err);
        }
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadPlayers();
    }, [loadPlayers]);


    if (isLoading) {
        return (
            <View style={Styles.centered}>
                <ActivityIndicator animating={true}/>
                <Text>Lade Spieler</Text>
            </View>
        );
    }
    return (
        <View style={styles.main}>
            <Button onPress={() => navigation.navigate('PlayerSelection')}>Neue Spielwertung</Button>
            <Button onPress={() => navigation.navigate('PlayerEdit')}>Spieler bearbeiten</Button>
        </View>

    );

};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        marginTop: 10
    }
});

export const screenOptions = () => {
    return {
        headerTitle: 'Spielwertungen'
    };
};

export default GameSheetOverview;
