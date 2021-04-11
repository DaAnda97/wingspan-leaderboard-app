import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from "react-redux";
import ScoringPlayer from "./components/ScoringPlayer";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native-paper";
import {SCORING_INPUT_KEYS} from "../model/INITIAL_SCORING_FIELDS";

const ScoringInput = ({navigation}) => {
    const dispatch = useDispatch();
    const keys = SCORING_INPUT_KEYS

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView>
                <View style={styles.scrollView}>
                    <FlatList
                        data={keys}
                        scrollEnabled={false}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.pointGoals}>
                                    <Text style={styles.textStyle}>{item}</Text>
                                </View>
                            )
                        }}
                    />
                    <ScoringPlayer/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    main: {
        flex: 1,

    },
    scrollView: {
        flex: 1,
        flexDirection: "row"
    },
    pointGoals: {
        padding: 10,
        borderWidth: 1,
    },
    textStyle: {
        height: 100
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