import React, {useMemo, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Divider, IconButton, Menu, Subheading, Text} from 'react-native-paper';
import i18n from 'i18n-js';
import ErrorView from '../../components/ErrorView';
import Colors from "../../constants/Colors";
import {useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import Player from "../../models/player/player";
import Scoring from "../../models/scoring/scoring";
import PlayerWithScores from "../../models/leaderboard/PlayerWithScores";

const Leaderboard = ({navigation}) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [category, setCategory] = useState("avgTotalScore")
    const [categoryMap] = useState<Map<string, string>>(new Map<string, string>([
        ["avgTotalScore", `Ø ${i18n.translate('total_points')}`],
        ["avgRoundPoints", `Ø ${i18n.translate('end_of_round_goals')}`],
        ["avgBonusPoints", `Ø ${i18n.translate('bonus_cards')}`],
        ["avgEggPoints", `Ø ${i18n.translate('eggs')}`],
        ["avgFoodPoints", `Ø ${i18n.translate('food_on_cards')}`],
        ["avgNectarPoints", `Ø ${i18n.translate('nectar')}`],
        ["avgBirdPoints", `Ø ${i18n.translate('birds')}`],
        ["avgCardPoints", `Ø ${i18n.translate('tucked_cards')}`],
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
                scoresOfPlayer.reduce((sum, current) => sum + current.roundPoints, 0) / scoresOfPlayer.length,
                scoresOfPlayer.reduce((sum, current) => sum + current.birdPoints, 0) / scoresOfPlayer.length,
                scoresOfPlayer.reduce((sum, current) => sum + current.eggPoints, 0) / scoresOfPlayer.length,
                scoresOfPlayer.reduce((sum, current) => sum + current.foodPoints, 0) / scoresOfPlayer.length,
                scoresOfPlayer.reduce((sum, current) => sum + current.nectarPoints, 0) / scoresOfPlayer.filter((score: Scoring) => score.isPacific).length,
                scoresOfPlayer.reduce((sum, current) => sum + current.birdPoints, 0) / scoresOfPlayer.length,
                scoresOfPlayer.reduce((sum, current) => sum + current.cardPoints, 0) / scoresOfPlayer.length,
                scoresOfPlayer.reduce((sum, current) => sum + current.totalScore, 0) / scoresOfPlayer.length,
        )
            items.push(playerWithScores)
        })

        return items
            .filter((item: PlayerWithScores) => !isNaN(item.get(category)))
            .sort((a: PlayerWithScores, b: PlayerWithScores) => {
                return b.get(category) - a.get(category)
            });
    }, [allPlayers, allScores, category])

    console.log(playersWithScores)

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

            <View style={{flexDirection: "row", height: 50, alignItems: "center", paddingLeft: 5}}>
                <Subheading style={{flex:1}}>Spieler</Subheading>
                <Menu
                    visible={isMenuOpen}
                    onDismiss={() => setIsMenuOpen(false)}
                    anchor={
                        <Button style={{flex:2}} onPress={() => setIsMenuOpen(true)}>{categoryMap.get(category)}</Button>
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
            
            <FlatList
                data={playersWithScores}
                renderItem={({item, index}: { item: PlayerWithScores, index: number }) => {
                    return(
                        <View key={item.id} style={{flexDirection: "row", height: 40, alignItems: "center", paddingLeft: 5}}>
                            <Text style={{flex:1}}>{index+1}. {item.name}</Text>
                            <Text style={{flex:2}}>{item.get(category).toFixed(2)}</Text>
                        </View>
                    )}}
            />
            <ErrorView errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});


export default Leaderboard;
