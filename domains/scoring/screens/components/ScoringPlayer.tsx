import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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
        <View style={styles.main}>

            <FlatList
                data={scoringFields}
                keyExtractor={(x, i) => i.toString()}
                initialNumToRender={7}
                scrollEnabled={false}
                renderItem={({ item }: { item: ScoringField }) => {
                    return (
                        <View key={item.key} style={styles.pointGoals}>
                            <TextInput
                                style={styles.textInput}
                                value={item.value}
                                onChangeText={input => setOneField(item.key, input)}
                                onFocus={() => {
                                    if(item.value === "0"){
                                        setOneField(item.key, "")
                                    }
                                }}
                                onEndEditing={() => {
                                    if(item.value === ""){
                                        setOneField(item.key, "0")
                                    }
                                }}
                                keyboardType={"decimal-pad"}
                                error={!item.isValid}
                            />
                        </View>
                    )
                }}
            />

            <ErrorView errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
        </View>
    )
}




const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    pointGoals: {
        padding: 10,
        borderWidth: 1
    },
    textInput: {
        height: 100
    }
})

export default ScoringPlayer