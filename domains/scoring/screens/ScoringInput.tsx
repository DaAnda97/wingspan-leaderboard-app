import React, {useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';

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
                    <View style={styles.categoryContainer}>
                        <View style={styles.playerRow}>
                            <Text> </Text>
                        </View>
                        {
                            keys.map(( key:string ) => {
                                return(
                                    <View key={key} style={styles.verticalCell}>
                                        <Text style={styles.textStyle}>{key}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>

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
    categoryContainer: {
        flex: 1,
    },
    playerRow: {
        height: 40
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 9,
        alignItems: "center",
    },
    textStyle: {
        flex: 1,
        margin: 5
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