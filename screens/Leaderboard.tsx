import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ErrorView from '../components/ui/ErrorView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Leaderboard = ({ navigation }) => {
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <View style={styles.main}>
            <Text>Bestenliste</Text>
            <ErrorView errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const screenOptions = () => {
    return {
        tabBarLabel: 'Bestenliste',
        tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
                name={focused ? 'podium' : 'podium-gold'}
                color={color}
                size={22}
            />
        )
    };
};

export default Leaderboard;
