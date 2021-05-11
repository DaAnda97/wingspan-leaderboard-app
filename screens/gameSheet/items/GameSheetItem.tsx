import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading, Text} from "react-native-paper";
import DateTime from "luxon/src/datetime.js";
import i18n from 'i18n-js';

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
    onPress: () => void
};

const GameSheetItem = ({ gameSheetItem, allScores, allPlayer, onPress }: Props) => {
    const scores = allScores.filter(score => score.gameSheetId === gameSheetItem.id)
    const sortedScores = scores.sort((a: Scoring, b: Scoring) => {return b.totalScore - a.totalScore })

    let dateTime: DateTime = DateTime.fromJSDate(gameSheetItem.timestamp)
    if(i18n.locale === "en"){
        dateTime = dateTime.setLocale("en").toFormat("ff")
    } else {
        dateTime = dateTime.setLocale("de").toFormat("dd.MM.yyyy 'um' HH':'mm 'Uhr")
    }

    return (
        <TouchableComponent onPress={onPress} style={Styles.shadow}>
            <View style={styles.textContainer}>
                <Subheading style={styles.date}>{dateTime}</Subheading>
                    {sortedScores.map((score: Scoring) => {
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