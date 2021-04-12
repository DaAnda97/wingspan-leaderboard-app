import React, {Ref, useState, createRef, RefObject} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import {Divider, HelperText, Subheading, Text, TextInput, Title} from 'react-native-paper'
import ScoringField from "../../model/scoringField";
import {INITIAL_SCORING_FIELDS} from "../../model/SCORING_CONSTANTS";
import helpers from "../../../../constants/Functions";
import Colors from "../../../../constants/Colors";

type Props = {
    playerIndex: number,
    playerId: string,
    playerName: string,
    inputRefs: RefObject<RNTextInput>[]
    goToNext: (colIndex: number, playerIndex: number) => void
};

const ScoringPlayer = ({playerIndex, playerId, playerName, inputRefs, goToNext}: Props) => {
    const [scoringFields, setScoringFields] = useState<Array<ScoringField>>(INITIAL_SCORING_FIELDS)

    // states
    const [totalScore, setTotalScore] = useState<number>(0)


    // methods
    const setOneField = (fieldKey: string, newValue: string) => {
        const updatedFieldIndex = scoringFields.findIndex(field => field.key === fieldKey)
        const isNumber = helpers.isNumber(newValue)

        const updatedField = new ScoringField(
            fieldKey,
            newValue,
            isNumber ? parseInt(newValue) : 0,
            isNumber
        )

        const updatedFields = [...scoringFields]
        updatedFields[updatedFieldIndex] = updatedField

        setTotalScore(updatedFields.reduce((sum, {intValue}) => sum + intValue, 0))
        setScoringFields(updatedFields)
    }


    return (
        <View style={styles.categoryContainer}>
            <View style={styles.playerRow}>
                <Subheading style={styles.playerText}>{playerName}</Subheading>
            </View>
            {
                scoringFields.map((scoringField: ScoringField, colIndex: number) => {
                    return (
                        <View key={scoringField.key} style={styles.verticalCell}>
                            <TextInput
                                style={styles.textInput}
                                value={scoringField.value}
                                error={!scoringField.isValid}
                                keyboardType={"decimal-pad"}

                                onChangeText={input =>
                                    setOneField(scoringField.key, input)
                                }
                                onFocus={() => {
                                    if (scoringField.value === "0") {
                                        setOneField(scoringField.key, "")
                                    }
                                }}
                                onEndEditing={() => {
                                    if (scoringField.value === "") {
                                        setOneField(scoringField.key, "0")
                                    }
                                }}

                                //focus next
                                ref={inputRefs[colIndex]}
                                onSubmitEditing={() => goToNext(colIndex, playerIndex)}
                                returnKeyType={"next"}
                            />
                            {!scoringField.isValid &&
                            <HelperText style={styles.helperText} type={scoringField.isValid ? "info" : "error"}>
                                Fehler
                            </HelperText>
                            }
                        </View>
                    )
                })
            }
            <View style={styles.scoreCell}>
                <Title>
                    {totalScore}
                </Title>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    categoryContainer: {
        flex: 1,
    },
    playerRow: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
    },
    playerText: {
        color: Colors.primary
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 11,
    },
    textInput: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        marginTop: 10
    },
    helperText: {
        alignSelf: "center",
    },
    scoreCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 11,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 0.5,
        marginTop: 10
    },
})

export default ScoringPlayer