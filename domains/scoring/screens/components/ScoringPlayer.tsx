import React, {useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {HelperText, Text, TextInput} from 'react-native-paper'
import ErrorView from "../../../../components/ErrorView";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from "react-redux";
import ScoringField from "../../model/scoringField";
import {INITIAL_SCORING_FIELDS} from "../../model/INITIAL_SCORING_FIELDS";
import helpers from "../../../../constants/Functions";

type Props = {

};

const ScoringPlayer = ({ }: Props) => {

    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('')
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
                <Text>Spieler 1</Text>
            </View>
            {
                scoringFields.map(( scoringField: ScoringField ) => {
                    return(
                        <View key={scoringField.key} style={styles.verticalCell} >
                                <TextInput
                                    style={styles.textInput}
                                    value={scoringField.value}
                                    onChangeText={input => setOneField(scoringField.key, input)}
                                    onFocus={() => {
                                        if(scoringField.value === "0"){
                                            setOneField(scoringField.key, "")
                                        }
                                    }}
                                    onEndEditing={() => {
                                        if(scoringField.value === ""){
                                            setOneField(scoringField.key, "0")
                                        }
                                    }}
                                    keyboardType={"decimal-pad"}
                                    error={!scoringField.isValid}
                                />
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
        height: 40
    },
    verticalCell: {
        minHeight: 50,
        height: Dimensions.get("screen").height / 9,
    },
    textInput: {
        flex: 1,
        margin: 5
    }
})

export default ScoringPlayer