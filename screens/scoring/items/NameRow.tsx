import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import helpers from '../../../constants/Functions';
import Colors from '../../../constants/Colors';
import Scoring from '../../../models/scoring/scoring';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/main/RootReducer';

type Props = {
    scores: Array<Scoring>;
};

const NameRow = ({ scores }: Props) => {
    const allPlayer = useSelector((state: RootState) => state.players.allPlayers);

    return (
        <View style={styles.nameView}>
            <View style={styles.categoryContainer}>
                <View style={styles.playerName}>
                    <Subheading> </Subheading>
                </View>
                {scores.length > 0 && (
                    <View>
                        <Subheading>i18n.translate('total')</Subheading>
                    </View>
                )}
            </View>
            {scores.map((scoring: Scoring) => {
                const currentPlayer =
                    allPlayer.find((player) => player.id === scoring.playerId)
                        ?? helpers.throwError('Error in ScoringInput: playerId not in allPlayers');
                return (
                    <View key={"NR_" + currentPlayer.id} style={styles.nameAndScore}>
                        <View style={styles.playerName}>
                            <Subheading style={styles.playerText}>
                                {currentPlayer.name}
                            </Subheading>
                        </View>
                        <View style={styles.score}>
                            <Subheading>{scoring.totalScore}</Subheading>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    nameView: {
        flexDirection: 'row'
    },
    nameAndScore: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    playerRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerName: {
        paddingTop: 5
    },
    playerText: {
        color: Colors.secondary
    },
    categoryContainer: {
        width: 95,
        alignItems: 'center',
        marginBottom: 5
    },
    score: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    }
});

export default NameRow;
