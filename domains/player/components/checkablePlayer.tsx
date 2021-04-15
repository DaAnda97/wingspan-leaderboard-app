import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Checkbox, Dialog, IconButton, Paragraph, Portal, TextInput} from 'react-native-paper'
import Player from "../../player/model/player";
import TouchableComponent from "../../../components/TouchableComponent";
import Colors from "../../../constants/Colors";
import {useDispatch} from "react-redux";
import * as playerActions from "../store/playerActions";


type Props = {
    player?: Player
    setOneCheckablePlayer: (playerId: string) => void
    status: Status
    setIsAdding: (isAdding: boolean) => void
};

type Status = "unchecked" | "indeterminate" | "checked";

const CheckablePlayer = ({player = new Player("", ""), setOneCheckablePlayer, status, setIsAdding}: Props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(player.name)
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false)
    const [isEditMode, setIsEditMode] = useState<boolean>(player.name === "")

    const createPlayer = useCallback((name: string) => {
        dispatch(
            playerActions.createPlayer(name)
        );
    }, [dispatch]);

    const updatePlayer = useCallback((newName: string) => {
        dispatch(
            playerActions.updatePlayer(player.id, newName)
        );
    }, [dispatch, player]);


    const deletePlayer = useCallback(() => {
        dispatch(
            playerActions.deletePlayer(player.id)
        );
    }, [dispatch, player]);


    if (isEditMode) {
        return (
            <View style={styles.mainContainer}>
                <IconButton size={23} icon={"delete-outline"} color={"red"} onPress={() => {
                    player.id === "" ? setIsAdding(false) : setIsDeleteDialogShown(true)
                }}/>

                <View style={styles.editContainer}>

                    <View style={styles.editButtonsStyle}>
                        <IconButton size={23} icon={"close"} color={Colors.secondary} onPress={() => {
                            player.id === "" ? setIsAdding(false) : setIsEditMode(false)
                        }}/>
                    </View>
                    <View style={styles.horizontalCentered}>
                        <TextInput
                            autoFocus={true}
                            value={name}
                            onChangeText={input => setName(input)}
                            onSubmitEditing={() => {
                                setIsEditMode(false)
                                setIsAdding(false)
                                player.id === "" ? createPlayer(name) : updatePlayer(name)
                            }}
                        />
                    </View>
                    <View style={styles.editButtonsStyle}>
                        <IconButton size={23} icon={"check"} color={Colors.secondary} onPress={() => {
                            setIsEditMode(false)
                            setIsAdding(false)
                            player.id === "" ? createPlayer(name) : updatePlayer(name)
                        }}/>
                    </View>

                </View>


                <Portal>
                    <Dialog visible={isDeleteDialogShown} onDismiss={() => setIsDeleteDialogShown(false)}>
                        <Dialog.Title>Warnung</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Eintrag "{name}" wirklich löschen?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setIsDeleteDialogShown(false)}>Abbrechen</Button>
                            <Button color={"red"} onPress={deletePlayer}>Löschen</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    } else {
        return (
            <View style={styles.mainContainer}>
                <IconButton size={23} icon={"pencil-outline"} color={Colors.secondary} onPress={() => {
                    setIsEditMode(true)
                }}/>
                <TouchableComponent key={player.id} style={styles.touchableContainer}
                                    onPress={() => setOneCheckablePlayer(player.id)}>
                    <View style={styles.verticalCentered}>
                        <Paragraph>{player.name}</Paragraph>
                    </View>
                    <Checkbox.Android
                        status={status}
                        onPress={() => {
                            setOneCheckablePlayer(player.id)
                        }}
                    />
                </TouchableComponent>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    editContainer: {
        flex: 1,
        paddingVertical: 15,
        elevation: 0,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editButtonsStyle: {
        padding: 5
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 0,
        borderRadius: 10,
        marginVertical: 3,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: "#bbb",
        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible',
    },
    verticalCentered: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizontalCentered: {
        flex: 1,
        width: '100%'
    },
})

export default CheckablePlayer