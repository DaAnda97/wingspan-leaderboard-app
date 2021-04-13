import React, {useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, TextInput as RNTextInput, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from "react-redux";
import ScoringPlayer from "./components/ScoringPlayer";
import {SafeAreaView} from "react-native-safe-area-context";
import {IconButton, Subheading, Text, Title} from "react-native-paper";
import {INPUT_REFS, SCORING_FIELD_NAMES} from "../model/SCORING_CONSTANTS";
import Colors from "../../../constants/Colors";
import Player from "../../player/model/player";
import SelectPlayers from "./components/SelectPlayers";
import ScoringFieldName from "../model/scoringFieldName";

const ScoringInput = ({navigation}) => {
    const dispatch = useDispatch();
    const names = SCORING_FIELD_NAMES
    const inputRefs = INPUT_REFS

    const [players, setPlayers] = useState<Array<Player>>([])
    const [isAddPlayersShown, setIsAddPlayersShown] = useState<boolean>(true)
    const [scoringSheetId] = useState(Math.random().toString(36).substring(2))


    const goToNext = (colIndex, playerIndex) => {
        if(playerIndex < players.length-1){
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

            <View style={styles.nameView}>
                <View style={styles.categoryContainer}>
                    <Text> </Text>
                </View>
                {
                    players.map((player: Player) => {
                        return (
                            <View key={player.id} style={styles.playerRow}>
                                <Subheading style={styles.playerText}>{player.name}</Subheading>
                            </View>
                        )
                    })
                }

            </View>



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
                        <View style={{...styles.verticalCell, borderTopWidth: 0.5, marginTop: 10}}>
                            <Subheading>GESAMT:</Subheading>
                        </View>
                    </View>


                    {
                        players.map((player: Player, playerIndex: number) => {
                            return (
                                <ScoringPlayer
                                    key={player.id}
                                    playerIndex={playerIndex}
                                    playerId={player.id}
                                    scoringId={scoringSheetId + "_" + player.id}
                                    scoringSheetId={scoringSheetId}
                                    inputRefs={inputRefs[playerIndex]}
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
                players={players}
                setPlayers={setPlayers}
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
    nameView: {
        flexDirection: "row"
    },
    scrollView: {
        flex: 1,
        flexDirection: "row"
    },
    categoryContainer: {
        width: 95
    },
    playerRow: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
    },
    playerText: {
        color: Colors.primary
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