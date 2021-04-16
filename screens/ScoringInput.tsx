import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from "react-redux";
import ScoringPlayer from "../components/scoring/ScoringPlayer";
import {SafeAreaView} from "react-native-safe-area-context";
import {Divider, IconButton, Text, Title} from "react-native-paper";
import {INPUT_REFS, SCORING_FIELD_NAMES} from "../models/scoring/SCORING_CONSTANTS";
import Colors from "../constants/Colors";
import SelectPlayers from "../components/scoring/SelectPlayers";
import ScoringFieldName from "../models/scoring/scoringFieldName";
import {RootState} from "../stores/main/RootReducer";
import Scoring from "../models/scoring/scoring";
import NameRow from "../components/scoring/NameRow";

import {saveScores} from "../repositories/scoringRepository"
import * as scoringActions from "../stores/scoring/scoringActions"
import * as playerActions from "../stores/player/playerActions";

const ScoringInput = ({navigation}) => {
    const dispatch = useDispatch()
    const names = SCORING_FIELD_NAMES
    const inputRefs = INPUT_REFS

    const [isAddPlayersShown, setIsAddPlayersShown] = useState<boolean>(true)
    const [scoringSheetId] = useState(Math.random().toString(36).substring(2))

    const allPlayer = useSelector((state: RootState) => state.players.allPlayers)
        .filter(player => player.isActive)
    const scores = useSelector((state : RootState) => state.scores.allScores)
        .filter(scoring => scoring.scoringSheetId === scoringSheetId)


    const goToNext = (colIndex, playerIndex) => {
        if(playerIndex < scores.length-1){
            inputRefs[playerIndex + 1][colIndex].current?.focus()
        } else {
            if(colIndex < inputRefs[0].length-1){
                inputRefs[0][colIndex + 1].current?.focus()
            }
        }
    }

    useEffect(() => {
        dispatch(playerActions.loadPlayersFromDb())
    }, []
    )

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <IconButton
                    icon={"account-multiple-plus"}
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                        setIsAddPlayersShown(true)
                    }}
                />
                <Title>Spielwertung</Title>
                <IconButton
                    icon={"content-save"}
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                        saveScores(scores)
                        dispatch(scoringActions.loadScoresFromDb())
                    }}
                />
            </View>

            <NameRow scores={scores} allPlayer={allPlayer}/>

            <Divider/>

            <ScrollView>
                <View style={styles.scrollView}>

                    <View style={styles.categoryContainer}>
                        {
                            names.map((name: ScoringFieldName, index: number) => {
                                return (
                                    <View key={index + ""} style={styles.verticalCell}>
                                        <Text style={styles.textStyle}>{name.name}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>


                    {
                        scores.map((scoring : Scoring, index : number) => {
                            return (
                                <ScoringPlayer
                                    key={scoring.id}
                                    playerIndex={index}
                                    playerId={scoring.playerId}
                                    scoringId={scoring.id}
                                    scoringSheetId={scoringSheetId}
                                    inputRefs={inputRefs[index]}
                                    goToNext={goToNext}
                                />
                            )
                        })
                    }

                </View>
            </ScrollView>

            {isAddPlayersShown &&
                <SelectPlayers
                    isAddPlayersShown={isAddPlayersShown}
                    setIsAddPlayersShown={setIsAddPlayersShown}
                    scoringSheetId={scoringSheetId}
                />
            }

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.inactive,
        padding: 10,
        marginBottom: 5
    },
    scrollView: {
        flex: 1,
        flexDirection: "row"
    },
    categoryContainer: {
        width: 95
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 11,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        margin: 5,
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