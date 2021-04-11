import React, {useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {HelperText, Subheading, Text, TextInput} from 'react-native-paper'
import ScoringField from "../../model/scoringField";
import {INITIAL_SCORING_FIELDS} from "../../model/INITIAL_SCORING_FIELDS";
import helpers from "../../../../constants/Functions";
import Colors from "../../../../constants/Colors";

type Props = {};

const ScoringPlayer = ({}: Props) => {
    const [scoringFields, setScoringFields] = useState<Array<ScoringField>>(INITIAL_SCORING_FIELDS)

    const setOneField = (fieldKey: string, newValue: string) => {
        const updatedFieldIndex = scoringFields.findIndex(field => field.key === fieldKey)
        const updatedField = new ScoringField(
            fieldKey,
            newValue,
            helpers.isNumber(newValue)
        )

        const updatedFields = [...scoringFields]
        updatedFields[updatedFieldIndex] = updatedField

        setScoringFields(updatedFields)
    }

    return (
        <View style={styles.categoryContainer}>
            <View style={styles.playerRow}>
                <Subheading style={styles.playerText}>Spieler 1</Subheading>
            </View>
            {
                scoringFields.map((scoringField: ScoringField) => {
                    return (
                        <View key={scoringField.key} style={styles.verticalCell}>
                            <TextInput
                                style={styles.textInput}
                                value={scoringField.value}
                                onChangeText={input => setOneField(scoringField.key, input)}
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
                                keyboardType={"decimal-pad"}
                                error={!scoringField.isValid}
                            />
                            {!scoringField.isValid &&
                                <HelperText style={styles.helperText} type={scoringField.isValid ? "info" : "error"}>
                                    Keine Zahl
                                </HelperText>
                            }
                        </View>
                    )
                })
            }
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
    playerText : {
        color: Colors.primary
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 9,
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
    }
})

export default ScoringPlayer