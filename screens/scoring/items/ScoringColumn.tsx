import React, { useState, RefObject, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import {
    HelperText,
    TextInput,
} from 'react-native-paper';
import ScoringField from '../../../models/scoring/scoringField';
import { INITIAL_SCORING_FIELDS } from '../../../models/scoring/SCORING_CONSTANTS';
import helpers from '../../../constants/Functions';
import * as scoringActions from '../../../stores/scoring/scoringActions';
import { useDispatch } from 'react-redux';

type Props = {
    playerIndex: number;
    playerId: string;
    scoringId: string;
    scoringSheetId: string;
    inputRefs: RefObject<RNTextInput>[];
    goToNext: (colIndex: number, playerIndex: number) => void;
};

const ScoringColumn = ({playerIndex, playerId, scoringId, scoringSheetId, inputRefs, goToNext}: Props) => {
    const dispatch = useDispatch();

    //states
    const [scoringFields, setScoringFields] = useState<Array<ScoringField>>(INITIAL_SCORING_FIELDS);

    // methods
    const setOneField = (fieldKey: string, newValue: string, doStateUpdate: boolean) => {
        const updatedFieldIndex = scoringFields.findIndex((field) => field.key === fieldKey);
        const oldField = scoringFields.find((field) => field.key === fieldKey);
        const isNumber = helpers.isNumber(newValue);

        const updatedField = new ScoringField(
            fieldKey,
            newValue,
            isNumber ? parseInt(newValue) : 0,
            isNumber || newValue === ''
        );

        const updatedFields = [...scoringFields];
        updatedFields[updatedFieldIndex] = updatedField;

        setScoringFields(updatedFields);

        if(doStateUpdate){
            updateScoringPlayer(updatedFields);
        }

    };

    const updateScoringPlayer = useCallback((updatedFields: Array<ScoringField>) => {
            dispatch(
                scoringActions.updateScoring(
                    scoringId,
                    scoringSheetId,
                    playerId,
                    updatedFields.find((field) => field.key === 'round')
                        ?.intValue || 0,
                    updatedFields.find((field) => field.key === 'bonus')
                        ?.intValue || 0,
                    updatedFields.find((field) => field.key === 'egg')
                        ?.intValue || 0,
                    updatedFields.find((field) => field.key === 'food')
                        ?.intValue || 0,
                    updatedFields.find((field) => field.key === 'nectar')
                        ?.intValue || 0,
                    updatedFields.find((field) => field.key === 'bird')
                        ?.intValue || 0,
                    updatedFields.find((field) => field.key === 'card')
                        ?.intValue || 0
                )
            );
        },
        [dispatch, playerId, scoringSheetId, scoringId]
    );

    return (
        <View style={styles.scoringColumn}>
            {scoringFields.map(
                (scoringField: ScoringField, colIndex: number) => {
                    return (
                        <View key={playerId + "_" + colIndex} style={styles.score}>
                            <TextInput
                                style={styles.textInput}
                                value={scoringField.value}
                                error={!scoringField.isValid}
                                keyboardType={'decimal-pad'}
                                onChangeText={(input) =>
                                    setOneField(scoringField.key, input, true)
                                }
                                onFocus={() => {
                                    if (scoringField.value === '0') {
                                        setOneField(scoringField.key, '', false);
                                    }
                                }}
                                onBlur={() => {
                                    if (scoringField.value === '') {
                                        setOneField(scoringField.key, '0', true);
                                    }
                                }}
                                //focus next
                                ref={inputRefs[colIndex]}
                                onSubmitEditing={() =>
                                    goToNext(colIndex, playerIndex)
                                }
                                returnKeyType={'next'}
                            />
                            {!scoringField.isValid && (
                                <HelperText
                                    style={styles.helperText}
                                    type={
                                        scoringField.isValid ? 'info' : 'error'
                                    }
                                >
                                    Fehler
                                </HelperText>
                            )}
                        </View>
                    );
                }
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    scoringColumn: {
        flex: 1
    },
    score: {
        minHeight: 50,
        height: Dimensions.get('screen').height / 11
    },
    textInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginTop: 10
    },
    helperText: {
        alignSelf: 'center'
    }
});

export default ScoringColumn;
