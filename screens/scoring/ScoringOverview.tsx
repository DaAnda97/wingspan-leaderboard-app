import React, {useCallback, useEffect, useState} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Dialog, Divider, IconButton, Paragraph, Portal, Text} from 'react-native-paper';
import {SCORING_FIELD_NAMES} from '../../models/scoring/SCORING_CONSTANTS';
import Colors from '../../constants/Colors';
import ScoringFieldName from '../../models/scoring/scoringFieldName';
import { RootState } from '../../stores/main/RootReducer';
import Scoring from '../../models/scoring/scoring';
import NameRow from './items/NameRow';
import ScoringColumn from "./items/ScoringColumn";
import * as scoringActions from "../../stores/scoring/scoringActions";
import * as gameSheetActions from "../../stores/gameSheet/gameSheetActions";


const ScoringOverview = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const scoringFieldNames = SCORING_FIELD_NAMES;
    const scores = useSelector((state: RootState) => state.scores.savedScores).filter((score : Scoring) => score.gameSheetId === route.params.gameSheetId)
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false)

    // Button in Navigation
    const deleteHandler = useCallback(() => {
        try {
            dispatch(gameSheetActions.deleteGameSheet(route.params.gameSheetId));
            scores.forEach((scoring) => {
                dispatch(scoringActions.deleteScoring(scoring.id));
            })
        } catch (err) {
            throw new Error(err);
        }

        navigation.goBack()
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={'delete'}
                    color={Colors.cation}
                    size={23}
                    onPress={() => setIsDeleteDialogShown(true)}
                />
            )
        });
    }, []);



    return (
        <View style={styles.main}>
            <NameRow scores={scores} />

            <Divider />

            <View>
                <View style={styles.scrollView}>
                    <View style={styles.categoryContainer}>
                        {scoringFieldNames.map((name: ScoringFieldName, index: number) => {
                            return (
                                <View key={'scoreFieldName_' + index} style={styles.score}>
                                    <Text style={styles.textStyle}>
                                        {name.name}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {scores.map((scoring: Scoring) => {
                        return (
                            <ScoringColumn
                                key={scoring.id}
                                scoring={scoring}
                            />
                        );
                    })}
                </View>
            </View>

            <Portal>
                <Dialog
                    visible={isDeleteDialogShown}
                    onDismiss={() => setIsDeleteDialogShown(false)}
                >
                    <Dialog.Title>Warnung</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Dieses Spiel wirklich löschen? Gelöschte Daten sind NICHT wiederherstellbar.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDeleteDialogShown(false)}>
                            Abbrechen
                        </Button>
                        <Button
                            color={Colors.cation}
                            onPress={() => {
                                setIsDeleteDialogShown(false)
                                deleteHandler()
                            }}>
                            Bestätigen
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.inactive,
        padding: 10,
        marginBottom: 5
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row'
    },
    categoryContainer: {
        width: 95,
        alignItems: 'flex-start'
    },
    score: {
        minHeight: 50,
        height: Dimensions.get('screen').height / 11,
        alignItems: "center",
        justifyContent: 'center',
    },
    textStyle: {
        margin: 5,
    }
});

export const screenOptions = () => {
    return {
        headerTitle: 'Spielübersicht'
    };
};

export default ScoringOverview;
