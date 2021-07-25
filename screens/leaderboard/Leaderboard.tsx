import React, {useMemo, useRef, useState} from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton, Subheading, Text} from 'react-native-paper';
import {
    Table,
    Row,
    Rows,
    Col,
} from 'react-native-table-component';
import i18n from 'i18n-js';
import ErrorView from '../../components/ErrorView';
import Colors from "../../constants/Colors";
import {useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import Player from "../../models/player/player";
import Scoring from "../../models/scoring/scoring";
import PlayerWithScores from "../../models/leaderboard/PlayerWithScores";

const borderColor = '#C1C0B9';
const primaryColor = 'dodgerblue';
const backgroundColor = '#F7F6E7';

const Leaderboard = ({navigation}) => {
    const [errorMsg, setErrorMsg] = useState('');

    const allPlayers: Array<Player> = useSelector((state: RootState) => state.players.allPlayers).filter((player: Player) => player.isActive)
    const allScores: Array<Scoring> = useSelector((state: RootState) => state.scores.savedScores)

    const leftRef = useRef<ScrollView>(null);
    const rightRef = useRef<ScrollView>(null);

    const tableHead = [
        'Head1',
        'Head2',
        'Head3',
        'Head4',
        'Head5',
        'Head6',
        'Head7',
        'Head8',
        'Head9',
    ]

    const widthArr = [50, 60, 80, 100, 120, 140, 160, 180, 200]

    const headerHeight = 40;
    const leftColumnWidth = 100;

    const recordData: Array<String> = [];
    for (let i = 0; i < 60; i += 1) {
        const rowData = [];
        // @ts-ignore
        rowData.push(`Record ${i}`);
        // @ts-ignore
        recordData.push(rowData);
    }

    const tableData = [];
    for (let i = 0; i < 60; i += 1) {
        const rowData = [];
        for (let j = 0; j < 9; j += 1) {
            // @ts-ignore
            rowData.push(`${i}${j}`);
        }
        // @ts-ignore
        tableData.push(rowData);
    }

    const playersWithScores: Array<PlayerWithScores> = useMemo(() => {
        const items: Array<PlayerWithScores> = []
        allPlayers.forEach((player: Player) => {
            const scoresOfPlayer: Array<Scoring> = allScores.filter((score: Scoring) => score.playerId === player.id)

            const playerWithScores: PlayerWithScores = {
                id: player.id,
                name: player.name,
                totalGames: scoresOfPlayer.length,
                pacificGames: scoresOfPlayer.filter((score: Scoring) => score.isPacific).length,
                avgRoundPoints: scoresOfPlayer.reduce((sum, current) => sum + current.roundPoints, 0) / scoresOfPlayer.length,
                avgBonusPoints: scoresOfPlayer.reduce((sum, current) => sum + current.birdPoints, 0) / scoresOfPlayer.length,
                avgEggPoints: scoresOfPlayer.reduce((sum, current) => sum + current.eggPoints, 0) / scoresOfPlayer.length,
                avgFoodPoints: scoresOfPlayer.reduce((sum, current) => sum + current.foodPoints, 0) / scoresOfPlayer.length,
                avgNectarPoints: scoresOfPlayer.reduce((sum, current) => sum + current.nectarPoints, 0) / scoresOfPlayer.filter((score: Scoring) => score.isPacific).length,
                avgBirdPoints: scoresOfPlayer.reduce((sum, current) => sum + current.birdPoints, 0) / scoresOfPlayer.length,
                avgCardPoints: scoresOfPlayer.reduce((sum, current) => sum + current.cardPoints, 0) / scoresOfPlayer.length,
                avgTotalScore: scoresOfPlayer.reduce((sum, current) => sum + current.totalScore, 0) / scoresOfPlayer.length,
            }
            items.push(playerWithScores)
        })

        return items;
    }, [allPlayers, allScores])


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

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#eee',
                }}
            >
                {/* Left Column */}
                <View
                    style={{
                        width: leftColumnWidth,
                        backgroundColor: 'yellow',
                        borderRightWidth: 1,
                        borderRightColor: borderColor,
                    }}
                >
                    {/* Blank Cell */}
                    <View
                        style={{
                            height: headerHeight,
                            backgroundColor: primaryColor,
                            borderBottomWidth: 1,
                            borderBottomColor: borderColor,
                        }}
                    ></View>
                    {/* Left Container : scroll synced */}
                    <ScrollView
                        ref={leftRef}
                        style={{
                            flex: 1,
                            backgroundColor: 'white',
                        }}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <Table
                            borderStyle={{
                                borderWidth: 1,
                                borderColor,
                            }}
                        >
                            {recordData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    widthArr={[leftColumnWidth]}
                                    style={index % 2 ? styles.row : { backgroundColor }}
                                    textStyle={styles.text}
                                />
                            ))}
                        </Table>
                    </ScrollView>
                </View>
                {/* Right Column */}
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                    }}
                >
                    <ScrollView horizontal={true} bounces={false}>
                        <View>
                            <Table borderStyle={{ borderWidth: 1, borderColor }}>
                                <Row
                                    data={tableHead}
                                    widthArr={widthArr}
                                    style={styles.head}
                                    textStyle={{ ...styles.text, color: 'white' }}
                                />
                            </Table>
                            <ScrollView
                                ref={rightRef}
                                style={styles.dataWrapper}
                                scrollEventThrottle={16}
                                bounces={false}
                                onScroll={(e) => {
                                    const { y } = e.nativeEvent.contentOffset;
                                    leftRef.current?.scrollTo({ y, animated: false });
                                }}
                            >
                                <Table borderStyle={{ borderWidth: 1, borderColor }}>
                                    {tableData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={widthArr}
                                            style={index % 2 ? styles.row : { backgroundColor }}
                                            textStyle={styles.text}
                                        />
                                    ))}
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </View>


            <ErrorView errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee' },
    head: { height: 40, backgroundColor: primaryColor },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    dataWrapper: { marginTop: -1 },
});


export default Leaderboard;
