import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Subheading} from 'react-native-paper'
import helpers from "../../../constants/Functions";
import Colors from "../../../constants/Colors";
import Scoring from "../model/scoring";
import Player from "../../player/model/player";

type Props = {
    scores : Array<Scoring>
    allPlayer : Array<Player>
};

const NameRow = ({scores, allPlayer}: Props) => {


    return (
        <View style={styles.nameView}>
            <View style={styles.categoryContainer}>
                <Subheading> </Subheading>
                {
                    scores.length > 0 &&
                    <View style={{...styles.verticalCell}}>
                        <Subheading>GESAMT:</Subheading>
                    </View>
                }
            </View>
            {
                scores.map((scoring: Scoring) => {
                    const currentPlayer = allPlayer.find(player => player.id === scoring.playerId)
                        ?? helpers.throwError("Error in ScoringInput: playerId not in allPlayers")
                    return (
                        <View key={scoring.id} style={styles.playerRow}>
                            <Subheading style={styles.playerText}>{currentPlayer.name}</Subheading>
                            <View style={{...styles.verticalCell}}>
                                <Subheading>{scoring.totalScore}</Subheading>
                            </View>

                        </View>
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    nameView: {
        flexDirection: "row"
    },
    categoryContainer: {
        width: 95
    },
    playerRow: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
        height: Dimensions.get("screen").height / 11,
    },
    playerText: {
        color: Colors.primary,
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 11,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default NameRow