import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper'
import Player from "../../models/player/player";
import Status from "../../models/player/CheckBoxStatus";
import CheckablePlayer from "./checkablePlayer";
import Colors from "../../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import * as scoringActions from "../../stores/scoring/scoringActions";
import helpers from "../../constants/Functions";


type Props = {
    scoringSheetId: string
};

const CheckablePlayers = ({scoringSheetId}: Props) => {
    const dispatch = useDispatch()
    const allPlayer = useSelector((state: RootState) => state.players.allPlayers).filter(player => player.isActive)
    const scoresOfSheet = useSelector((state: RootState) => state.scores.allScores).filter(scoring => scoring.scoringSheetId === scoringSheetId)


    // initial
    const initialCheckablePlayers = () => {
        let initCheckablePlayers: Map<string, Status> = new Map()
        allPlayer.forEach(player => {
            initCheckablePlayers.set(
                player.id,
                scoresOfSheet.find(scoring => scoring.playerId === player.id) == undefined ? "unchecked" : "checked"
            )
        })
        return initCheckablePlayers
    }


    // states
    const [checkablePlayers, setCheckablePlayers] = useState<Map<string, Status>>(initialCheckablePlayers)
    const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false)
    const [isAdding, setIsAdding] = useState(false)


    // methods
    const createNewScoringPlayer = useCallback((playerId: string) => {
        dispatch(
            scoringActions.createScoring(scoringSheetId, playerId)
        );
    }, [dispatch, scoresOfSheet, scoringSheetId, scoringActions]);

    const deleteScoringPlayer = useCallback((playerId: string) => {
        const thisScoring = scoresOfSheet.find(scoring => scoring.scoringSheetId === scoringSheetId && scoring.playerId === playerId)
            ?? helpers.throwError(`Error in SelectPlayers: no matching scoring with sheetId: ${scoringSheetId} and playerId: ${playerId} not in scoresOfSheet: ${JSON.stringify(scoresOfSheet)}`)
        dispatch(
            scoringActions.deleteScoring(thisScoring.id)
        );
    }, [dispatch, scoresOfSheet, scoringSheetId, scoringActions]);


    const setOneCheckablePlayer = useCallback((playerId: string) => {
        const updatedCheckablePlayers = new Map<string, Status>(checkablePlayers)
        if (checkablePlayers.get(playerId) === "checked" && scoresOfSheet.length <= 5) {
            updatedCheckablePlayers.set(playerId, "unchecked")
            deleteScoringPlayer(playerId)
        } else if (checkablePlayers.get(playerId) === "unchecked" && scoresOfSheet.length < 5) {
            updatedCheckablePlayers.set(playerId, "checked")
            createNewScoringPlayer(playerId)
        }
        setCheckablePlayers(updatedCheckablePlayers)
    }, [checkablePlayers, scoresOfSheet, createNewScoringPlayer, deleteScoringPlayer])


    const indeterminateUnselectableFields = useCallback(() => {
        if (scoresOfSheet.length == 4 && isIndeterminate) {
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers)
            updatedCheckablePlayers.forEach((status: Status, playerId: string) => {
                if (status === "indeterminate") {
                    updatedCheckablePlayers.set(playerId, "unchecked")
                } else {
                    updatedCheckablePlayers.set(playerId, status)
                }
            })
            setCheckablePlayers(updatedCheckablePlayers)
            setIsIndeterminate(false)
        } else if (scoresOfSheet.length == 5 && !isIndeterminate) {
            const updatedCheckablePlayers: Map<string, Status> = new Map(checkablePlayers)
            updatedCheckablePlayers.forEach((status: Status, playerId: string) => {
                if (status === "unchecked") {
                    updatedCheckablePlayers.set(playerId, "indeterminate")
                } else {
                    updatedCheckablePlayers.set(playerId, status)
                }
            })
            setCheckablePlayers(updatedCheckablePlayers)
            setIsIndeterminate(true)
        }
    }, [scoresOfSheet, checkablePlayers, setCheckablePlayers])


    useEffect(() => {
        indeterminateUnselectableFields()
    }, [indeterminateUnselectableFields, scoresOfSheet, checkablePlayers, setCheckablePlayers])


    return (
        <View style={styles.main}>


            {
                allPlayer.length > 0 ?
                    allPlayer.map((player: Player) => {
                        return (
                            <CheckablePlayer
                                key={player.id}
                                player={player}
                                setOneCheckablePlayer={setOneCheckablePlayer}
                                status={checkablePlayers.get(player.id) ?? "unchecked"}
                                setIsAdding={setIsAdding}
                            />
                        )
                    })
                    :
                    <Text style={styles.defaultTextStyle}>Noch keine Spieler vorhanden. Lege zuerst Spieler
                        an.</Text>
            }
            {
                isAdding ?
                    <CheckablePlayer
                        setOneCheckablePlayer={setOneCheckablePlayer}
                        status={"unchecked"}
                        setIsAdding={setIsAdding}
                    /> :
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.buttonStyle}
                            icon={"account-plus"}
                            color={Colors.secondary}
                            onPress={() => {
                                setIsAdding(true)
                            }}>
                            Neuen Spieler anlegen
                        </Button>
                    </View>
            }


        </View>

    )

}


const styles = StyleSheet.create({
    main: {

    },
    touchableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 0,
        borderRadius: 10,
        marginVertical: 3,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: "#bbb",
        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible',
    },
    verticalCentered: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryBackground,
        alignItems: "center"
    },
    buttonStyle: {
        color: Colors.secondary,
        width: "90%",
    },
    defaultTextStyle: {
        textAlign: 'center',
        padding: 5
    }

})

export default CheckablePlayers