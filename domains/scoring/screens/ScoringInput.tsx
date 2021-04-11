import React, {useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from "react-redux";
import ScoringPlayer from "./components/ScoringPlayer";
import {SafeAreaView} from "react-native-safe-area-context";
import {IconButton, Text} from "react-native-paper";
import {SCORING_INPUT_KEYS} from "../model/INITIAL_SCORING_FIELDS";
import Colors from "../../../constants/Colors";
import Player from "../../player/model/player";
import SelectPlayers from "./components/SelectPlayers";
import {RootState} from "../../main/store/RootReducer";

const ScoringInput = ({navigation}) => {
    const dispatch = useDispatch();
    const keys = SCORING_INPUT_KEYS

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
        flex: 1,
    },
    playerRow: {
        height: 40
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 9,
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