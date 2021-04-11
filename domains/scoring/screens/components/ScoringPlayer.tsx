import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Divider, HelperText, Subheading, Text, TextInput, Title} from 'react-native-paper'
import ScoringField from "../../model/scoringField";
import {INITIAL_SCORING_FIELDS} from "../../model/SCORING_CONSTANTS";
import helpers from "../../../../constants/Functions";
import Colors from "../../../../constants/Colors";

type Props = {
    playerId: string,
    playerName: string
};

const ScoringPlayer = ({playerId, playerName}: Props) => {
    const [scoringFields, setScoringFields] = useState<Array<ScoringField>>(INITIAL_SCORING_FIELDS)

    // states
    const [totalScore, setTotalScore] = useState<number>(0)


    // methods
    const setOneField = (fieldKey: string, newValue: string) => {
        const updatedFieldIndex = scoringFields.findIndex(field => field.key === fieldKey)
        const updatedField = new ScoringField(
            fieldKey,
            newValue,
            helpers.isNumber(newValue)
        )

        const updatedFields = [...scoringFields]
        updatedFields[updatedFieldIndex] = updatedField

        updateTotalScore()
        setScoringFields(updatedFields)
    }

    const updateTotalScore = () => {
        if (!Array.from(scoringFields.map(field => field.isValid)).includes(false)) {
            const totalScore : number = scoringFields
                .map(field => field.value)
                .map(value => Number.parseInt(value))
                .reduce((sum, current) => sum + current, 0)

            setTotalScore(totalScore)
        }
    }

    return (
        <View style={styles.categoryContainer}>
            <View style={styles.playerRow}>
                <Subheading style={styles.playerText}>{playerName}</Subheading>
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
    playerText : {
        color: Colors.primary
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 10,
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
        height: Dimensions.get("screen").height / 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 0.5,
        marginTop: 10
    },
})

export default ScoringPlayer