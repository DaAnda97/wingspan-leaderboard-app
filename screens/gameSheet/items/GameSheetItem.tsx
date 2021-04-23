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
    allScores: Array<Scoring>
    allPlayer: Array<Player>
};

const GameSheetItem = ({ gameSheetItem, allScores, allPlayer }: Props) => {
    const [date] = useState(gameSheetItem.timestamp.toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }))
    const [time] = useState(gameSheetItem.timestamp.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' }))

    const scores = allScores.filter(score => score.gameSheetId === gameSheetItem.id)

    return (
        <TouchableComponent onPress={() => {}} style={Styles.shadow}>
            <View style={styles.textContainer}>
                <Subheading style={styles.date}>{date} um {time} Uhr</Subheading>
                    {scores.map((score: Scoring) => {
                        const player = allPlayer.find(player => player.id === score.playerId)
                            ?? helpers.throwError("No player found for this score")
                        return (
                            <View key={player.id + "_" + score.id}>
                                <Text style={styles.playerScore}>{player.name}: {score.totalScore}</Text>
                            </View>
                        )
                    })}

            </View>
        </TouchableComponent>
    )
}

const styles = StyleSheet.create({
    date: {
        marginTop: 5,
        marginBottom: 15
    },
    playerScore: {
        paddingVertical: 3,
        textAlign: 'right'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        height: '60%',
        padding: 10
    }
})

export default GameSheetItem;