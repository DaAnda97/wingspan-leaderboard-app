import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {HelperText, Subheading, TextInput} from 'react-native-paper';
import TouchableComponent from "../../components/TouchableComponent";
import Styles from "../../constants/Styles"

type Props = {
    label: string,
    selectedValue: string,
    setOpen: (isOpen: boolean) => void
};


const DropDownAnchor = ({label, selectedValue, setOpen}: Props) => {

    return (
        <View style={{...Styles.shadow}}>
            <View style={styles.container}>
                <HelperText type={"info"}>{label}</HelperText>
                <Subheading style={{alignSelf: "stretch"}}>{selectedValue}</Subheading>
            </View>

        </View>

    );

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        width: "auto",
    },
    container: {
        marginLeft: 10,
        marginBottom: 5,
    },
});

export default DropDownAnchor;
