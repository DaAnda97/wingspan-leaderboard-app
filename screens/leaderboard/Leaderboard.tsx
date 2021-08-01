import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Button, Divider, IconButton, Menu, Subheading, Text} from 'react-native-paper';
import i18n from 'i18n-js';
import ErrorView from '../../components/ErrorView';
import Colors from "../../constants/Colors";
import {useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import Player from "../../models/player/player";
import Scoring from "../../models/scoring/scoring";
import PlayerWithScores from "../../models/leaderboard/PlayerWithScores";
import Points from "../../models/leaderboard/Points";

const Leaderboard = ({navigation}) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [category, setCategory] = useState("totalScore")
    const [categoryMap] = useState<Map<string, string>>(new Map<string, string>([
        ["totalScore", `${i18n.translate('total_points')}`],
        ["roundPoints", `${i18n.translate('end_of_round_goals')}`],
        ["bonusPoints", `${i18n.translate('bonus_cards')}`],
        ["eggPoints", `${i18n.translate('eggs')}`],
        ["foodPoints", `${i18n.translate('food_on_cards')}`],
        ["nectarPoints", `${i18n.translate('nectar')}`],
        ["birdPoints", `${i18n.translate('birds')}`],
        ["cardPoints", `${i18n.translate('tucked_cards')}`],
    ]))


    const allPlayers: Array<Player> = useSelector((state: RootState) => state.players.allPlayers).filter((player: Player) => player.isActive)
    const allScores: Array<Scoring> = useSelector((state: RootState) => state.scores.savedScores)


    const playersWithScores: Array<PlayerWithScores> = useMemo(() => {
        const items: Array<PlayerWithScores> = []
        allPlayers.forEach((player: Player) => {
            const scoresOfPlayer: Array<Scoring> = allScores.filter((score: Scoring) => score.playerId === player.id)

            const playerWithScores = new PlayerWithScores(
                player.id,
                player.name,
                scoresOfPlayer.length,
                scoresOfPlayer.filter((score: Scoring) => score.isPacific).length,
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.roundPoints, 0) / scoresOfPlayer.length,
                    Math.max(...scoresOfPlayer.map(o => o.roundPoints), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.roundPoints), Infinity),
                ),
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.birdPoints, 0) / scoresOfPlayer.length,
                    Math.max(...scoresOfPlayer.map(o => o.birdPoints), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.birdPoints), Infinity),
                ),
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.eggPoints, 0) / scoresOfPlayer.length,
                    Math.max(...scoresOfPlayer.map(o => o.eggPoints), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.eggPoints), Infinity),
                ),
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.foodPoints, 0) / scoresOfPlayer.length,
                    Math.max(...scoresOfPlayer.map(o => o.foodPoints), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.foodPoints), Infinity),
                ),
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.nectarPoints, 0) / scoresOfPlayer.filter((score: Scoring) => score.isPacific).length,
                    Math.max(...scoresOfPlayer.map(o => o.nectarPoints), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.nectarPoints), Infinity),
                ),
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.birdPoints, 0) / scoresOfPlayer.length,
                    Math.max(...scoresOfPlayer.map(o => o.birdPoints), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.birdPoints), Infinity),
                ),
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.cardPoints, 0) / scoresOfPlayer.length,
                    Math.max(...scoresOfPlayer.map(o => o.cardPoints), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.cardPoints), Infinity),
                ),
                new Points(
                    scoresOfPlayer.reduce((sum, current) => sum + current.totalScore, 0) / scoresOfPlayer.length,
                    Math.max(...scoresOfPlayer.map(o => o.totalScore), -Infinity),
                    Math.min(...scoresOfPlayer.map(o => o.totalScore), Infinity),
                ),
            )
            items.push(playerWithScores)
        })

        return items
            .filter((item: PlayerWithScores) => !isNaN(item.get(category).avg))
            .sort((a: PlayerWithScores, b: PlayerWithScores) => {
                return b.get(category).avg - a.get(category).avg
            });
    }, [allPlayers, allScores, category])


    return (
        <View style={styles.main}>
            <Appbar.Header theme={{colors: {primary: "white"}}}>
                <IconButton
                    icon={'menu'}
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
                <Appbar.Content
                    color={Colors.primary}
                    title={i18n.translate('leaderboard')}
                />
            </Appbar.Header>

            <View style={styles.headerRow}>
                <View style={styles.playerCol}>
                    <Subheading>{i18n.translate('player')}</Subheading>
                    <Text>({i18n.translate('total_games')})</Text>
                </View>
                <Menu
                    visible={isMenuOpen}
                    style={styles.pointsCol}
                    onDismiss={() => setIsMenuOpen(false)}
                    anchor={
                        <Button icon={"menu-down"} color={Colors.secondary} onPress={() => setIsMenuOpen(true)}>{categoryMap.get(category)}</Button>
                    }>
                    {[...categoryMap].map(([key, value]) => (
                        <Menu.Item key={key} onPress={() => {
                            setIsMenuOpen(false)
                            setCategory(key)
                        }} title={value}/>
                    ))}
                </Menu>
            </View>
            <Divider/>

            {playersWithScores.length > 0 ?
                <View style={styles.main}>
                    <View style={styles.nameAndPointsRow}>
                        <Text style={styles.playerCol}> </Text>
                        <View style={styles.pointsCol}>
                            <Text style={styles.textStyle}>Ø</Text>
                            <Text style={styles.textStyle}>Max</Text>
                            <Text style={styles.textStyle}>Min</Text>
                        </View>
                    </View>


                    <FlatList
                        data={playersWithScores}
                        renderItem={({item, index}: { item: PlayerWithScores, index: number }) => {
                            return(
                                <View key={item.id} style={styles.nameAndPointsRow}>
                                    <Text style={styles.playerCol}>{index+1}. {item.name} ({item.totalGames})</Text>
                                    <View style={styles.pointsCol}>
                                        <Text style={styles.textStyle}>{item.get(category).avg.toFixed(2)}</Text>
                                        <Text style={styles.textStyle}>{item.get(category).max}</Text>
                                        <Text style={styles.textStyle}>{item.get(category).min}</Text>
                                    </View>

                                </View>
                            )}}
                    />
                </View> :
                <View style={{flex: 1, alignItems: "center",padding: 40}}>
                    <Text>
                        {i18n.translate('no_points_text')}
                    </Text>
                    {category === "nectarPoints"
                        ? <Text>{i18n.translate('no_nectar_points_text')}</Text>
                        : <Text>{i18n.translate('no_games_points_text')}</Text>
                    }
                </View>
            }


            <ErrorView errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    playerCol: {
        flex: 1
    },
    pointsCol: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center"
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
    },
    nameAndPointsRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 5,
        height: 40
    },
    textStyle: {
        flex:1,
        textAlign: "center"
    }
});


export default Leaderboard;
