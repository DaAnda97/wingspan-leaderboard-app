import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading, Text} from "react-native-paper";
import Styles from '../../../constants/Styles';
import TouchableComponent from "../../../components/TouchableComponent";
import Scoring from "../../../models/scoring/scoring";
import GameSheet from "../../../models/gameSheet/gameSheet";
import Player from "../../../models/player/player";
import helpers from "../../../constants/Functions";

type Props = {
    gameSheetItem: GameSheet
    scores: Array<Scoring>
    allPlayer: Array<Player>
};

const GameSheetItem = ({ gameSheetItem, scores, allPlayer }: Props) => {
    const [date] = useState(gameSheetItem.timestamp.toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }))
    const [time] = useState(gameSheetItem.timestamp.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' }))

    return (
        <TouchableComponent onPress={() => {}} style={Styles.shadow}>
            <View style={styles.textContainer}>
                <Subheading style={styles.customer}>{date} um {time} Uhr</Subheading>
                    {scores.map((score: Scoring) => {
                        console.log("hi")
                        const player = allPlayer.find(player => player.id === score.playerId)
                            ?? helpers.throwError("No player found for this score")
                        return (
                            <View key={player.id + "_" + score.id}>
                                <Text style={styles.address}>{player.name}: {score.totalScore}</Text>
                            </View>
                        )
                    })}

            </View>
        </TouchableComponent>
    )
}

const styles = StyleSheet.create({
    customer: {
        marginVertical: 4
    },
    address: {
        paddingVertical: 7,
        textAlign: 'right'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40%',
        paddingHorizontal: 20
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        height: '60%',
        padding: 10
    }
})

export default GameSheetItem;