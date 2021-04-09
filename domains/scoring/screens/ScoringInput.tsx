import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import ErrorView from "../../../components/ErrorView";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from "react-redux";
import Scoring from "../model/scoring";
import ScoringPlayer from "./components/ScoringPlayer";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native-paper";

const ScoringInput = ({navigation}) => {
    const dispatch = useDispatch();
    const keys : Array<string> = ["round", "bonus", "egg", "food", "nectar", "bird", "card"]

    return (
        <SafeAreaView style={styles.main}>
            <FlatList
                data={keys}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.pointGoals}>
                            <Text>{item}</Text>
                        </View>
                    )
                }}
            />
            <ScoringPlayer keys={keys}/>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "row"
    },
    pointGoals: {
        padding: 10,
        borderWidth: 1
    }
})


export const screenOptions = () => {
    return {
        tabBarLabel: 'Spielwertung',
        tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
                name={focused ? "medal" : "medal-outline"}
                color={color}
                size={22}
            />
        ),
    };
};

export default ScoringInput;