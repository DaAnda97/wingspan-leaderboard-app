import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18n-js';
import {Button, Dialog, Divider, IconButton, Paragraph, Portal, Text} from 'react-native-paper';
import {INPUT_REFS} from '../../models/scoring/SCORING_CONSTANTS';
import Colors from '../../constants/Colors';
import ScoringFieldName from '../../models/scoring/scoringFieldName';
import { RootState } from '../../stores/main/RootReducer';
import Scoring from '../../models/scoring/scoring';
import * as scoringActions from '../../stores/scoring/scoringActions';
import ScoringInputColumn from './items/ScoringInputColumn';
import NameRow from './items/NameRow';
import PointCategoryContainer from "./items/PointCategoryColumn";


const ScoringInput = ({ navigation }) => {
    const dispatch = useDispatch();
    const inputRefs = INPUT_REFS;

    const gamingSheetId = useSelector((state: RootState) => state.scores.unsavedGameSheetId)
    const unsavedScores = useSelector((state: RootState) => state.scores.unsavedScores)

    const [isErrorMessageShown, setIsErrorMessageShown] = useState<boolean>(false)

    const goToNext = (colIndex, playerIndex) => {
        if (playerIndex < unsavedScores.length - 1) {
            inputRefs[playerIndex + 1][colIndex].current?.focus();
        } else {
            if (colIndex < inputRefs[0].length - 1) {
                inputRefs[0][colIndex + 1].current?.focus();
            }
        }
    };

    const saveHandler = useCallback(() => {
        const areAllScoresValid = !Array.from(unsavedScores.map(unsavedScore => unsavedScore.isValid)).includes(false)
        if (areAllScoresValid){
            dispatch(scoringActions.saveScores(unsavedScores));
            navigation.popToTop();
        } else {
            setIsErrorMessageShown(true)
        }

    }, [unsavedScores]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={'content-save'}
                    color={Colors.primary}
                    size={30}
                    onPress={saveHandler}
                />
            )
        });
    }, [saveHandler]);

    return (
        <View style={styles.main}>
            <NameRow scores={unsavedScores} />
            <Divider />

            <ScrollView keyboardShouldPersistTaps={"handled"}>
                <View style={styles.scrollView}>
                    <View style={styles.categoryContainer}>
                        <PointCategoryContainer />
                    </View>

                    {unsavedScores.map((scoring: Scoring, index: number) => {
                        return (
                            <ScoringInputColumn
                                key={scoring.id}
                                playerIndex={index}
                                playerId={scoring.playerId}
                                scoringId={scoring.id}
                                scoringSheetId={gamingSheetId}
                                inputRefs={inputRefs[index]}
                                goToNext={goToNext}
                            />
                        );
                    })}
                </View>
            </ScrollView>

            <Portal>
                <Dialog
                    visible={isErrorMessageShown}
                    onDismiss={() => setIsErrorMessageShown(false)}
                >
                    <Dialog.Title>{i18n.translate('error')}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            i18n.translate('cant_save_wrong_entries')
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsErrorMessageShown(false)}>
                            Ok
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        margin: 5,
    }
});

export default ScoringInput;
