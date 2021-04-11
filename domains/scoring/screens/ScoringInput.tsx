import React, {useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from "react-redux";
import ScoringPlayer from "./components/ScoringPlayer";
import {SafeAreaView} from "react-native-safe-area-context";
import {Divider, IconButton, Subheading, Text, Title} from "react-native-paper";
import {SCORING_FIELD_NAMES} from "../model/SCORING_CONSTANTS";
import Colors from "../../../constants/Colors";
import Player from "../../player/model/player";
import SelectPlayers from "./components/SelectPlayers";
import ScoringFieldName from "../model/scoringFieldName";

const ScoringInput = ({navigation}) => {
    const dispatch = useDispatch();
    const names = SCORING_FIELD_NAMES

    const [isAddPlayersShown, setIsAddPlayersShown] = useState<boolean>(false)
    const [players, setPlayers] = useState<Array<Player>>([])

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView>
                <View style={styles.scrollView}>

                    <View style={styles.categoryContainer}>
                        <View style={styles.playerRow}>
                            <Text> </Text>
                        </View>
                        {
                            names.map(( name: ScoringFieldName ) => {
                                return(
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
                        players.map( (player : Player) => {
                            return (
                                <ScoringPlayer key={player.id} playerId={player.id} playerName={player.name}/>
                            )
                        })
                    }


                    <View>
                        <IconButton icon={"account-multiple-plus"} color={Colors.primary} onPress={() => {
                            setIsAddPlayersShown(true)
                        }}/>
                    </View>

                </View>
            </ScrollView>

            {isAddPlayersShown &&
                <SelectPlayers
                    isAddPlayersShown={isAddPlayersShown}
                    setIsAddPlayersShown={setIsAddPlayersShown}
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
    scrollView: {
        flex: 1,
        flexDirection: "row"
    },
    categoryContainer: {
        width: 95
    },
    playerRow: {
        height: 40
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 10,
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