import React, {useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper'
import ErrorView from "../../../../components/ErrorView";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from "react-redux";
import Scoring from "../../model/scoring";
import {Item} from "react-native-paper/lib/typescript/components/List/List";

type Props = {
    keys: Array<string>
};

const ScoringPlayer = ({ keys }: Props) => {

    const initialPoints : Map<string, number> = new Map()
    keys.forEach((key: string) => {
        initialPoints.set(key, 0)
    })

    const initialValidators : Map<string, boolean> = new Map()
    keys.forEach((key: string) => {
        initialValidators.set(key, true)
    })



    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('')
    const [points, setPoints] = useState<Map<string, number>>(initialPoints)
    const [validators, setValidators] = useState<Map<string, boolean>>(initialValidators)


//Array.from(points.keys())
    return (
        <View style={styles.main}>

            <FlatList
                data={keys}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.pointGoals}>
                            <Text>{item}</Text>
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
    }
})

export default ScoringPlayer