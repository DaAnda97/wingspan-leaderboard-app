import React, { useState, RefObject, useCallback } from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HelperText, TextInput,} from 'react-native-paper';
import i18n from 'i18n-js';
import ScoringField from '../../../models/scoring/scoringField';
import helpers from '../../../constants/Functions';
import * as scoringActions from '../../../stores/scoring/scoringActions';
import {RootState} from "../../../stores/main/RootReducer";
import {INITIAL_SCORING_FIELDS, INITIAL_SCORING_FIELDS_PACIFIC} from "../../../models/scoring/SCORING_CONSTANTS";

type Props = {
    playerIndex: number;
    playerId: string;
    scoringId: string;
    scoringSheetId: string;
    inputRefs: RefObject<RNTextInput>[];
    goToNext: (colIndex: number, playerIndex: number) => void;
};

const ScoringInputColumn = ({playerIndex, playerId, scoringId, scoringSheetId, inputRefs, goToNext}: Props) => {
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings)
    const initialScoringFields = settings.isPacificEnabled ? INITIAL_SCORING_FIELDS_PACIFIC : INITIAL_SCORING_FIELDS

    //states
    const [scoringFields, setScoringFields] = useState<Array<ScoringField>>(initialScoringFields);

    // methods
    const setOneField = (fieldKey: string, newValue: string, doStateUpdate: boolean) => {
        const updatedFieldIndex = scoringFields.findIndex((field) => field.key === fieldKey);
        const isValid = helpers.isNumber(newValue) && parseInt(newValue) >= 0;

        const updatedField = new ScoringField(
            fieldKey,
            newValue,
            isValid ? parseInt(newValue) : 0,
            isValid || newValue === ''
        );

        const updatedFields = [...scoringFields];
        updatedFields[updatedFieldIndex] = updatedField;

        setScoringFields(updatedFields);

        if(doStateUpdate){
            updateScoringPlayer(updatedFields);
        }

    };

    const updateScoringPlayer = useCallback((updatedFields: Array<ScoringField>) => {
        const areFieldsValid = updatedFields.map((field: ScoringField) => helpers.isNumber(field.value) && parseInt(field.value) >= 0)
        const isValid = !areFieldsValid.includes(false)
            dispatch(
                scoringActions.updateScoring(
                    scoringId,
                    scoringSheetId,
                    playerId,
                    settings.isPacificEnabled,
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
                        ?.intValue || 0,
                    isValid
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
                                    {i18n.translate("error")}
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

export default ScoringInputColumn;
