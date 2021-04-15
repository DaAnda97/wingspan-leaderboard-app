import React, {useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, TextInput as RNTextInput, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from "react-redux";
import ScoringPlayer from "../components/ScoringPlayer";
import {SafeAreaView} from "react-native-safe-area-context";
import {Divider, IconButton, Subheading, Text, Title} from "react-native-paper";
import {INPUT_REFS, SCORING_FIELD_NAMES} from "../model/SCORING_CONSTANTS";
import Colors from "../../../constants/Colors";
import SelectPlayers from "../components/SelectPlayers";
import ScoringFieldName from "../model/scoringFieldName";
import {RootState} from "../../main/store/RootReducer";
import Scoring from "../model/scoring";
import NameRow from "../components/NameRow";

const ScoringInput = ({navigation}) => {
    const dispatch = useDispatch();
    const names = SCORING_FIELD_NAMES
    const inputRefs = INPUT_REFS

    const [isAddPlayersShown, setIsAddPlayersShown] = useState<boolean>(true)
    const [scoringSheetId] = useState(Math.random().toString(36).substring(2))

    const allPlayer = useSelector((state: RootState) => state.players.allPlayers)
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

                    }}
                />
            </View>

            <NameRow scores={scores} allPlayer={allPlayer}/>

            <Divider/>

            <ScrollView>
                <View style={styles.scrollView}>

                    <View style={styles.categoryContainer}>
                        {
                            names.map((name: ScoringFieldName) => {
                                return (
                                    <View key={name.key} style={styles.verticalCell}>
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