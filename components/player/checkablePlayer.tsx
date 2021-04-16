import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Checkbox, Dialog, IconButton, Paragraph, Portal, TextInput} from 'react-native-paper'
import Player from "../../models/player/player";
import TouchableComponent from "../ui/TouchableComponent";
import Colors from "../../constants/Colors";
import {useDispatch} from "react-redux";
import * as playerActions from "../../stores/player/playerActions";
import {savePlayer} from "../../repositories/playerRepository"

type Props = {
    player?: Player
    setOneCheckablePlayer: (playerId: string) => void
    status: Status
    setIsAdding: (isAdding: boolean) => void
};

type Status = "unchecked" | "indeterminate" | "checked";

const CheckablePlayer = ({player = new Player("", "", true), setOneCheckablePlayer, status, setIsAdding}: Props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(player.name)
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false)
    const [isEditMode, setIsEditMode] = useState<boolean>(player.name === "")

    const createPlayer = useCallback((name: string) => {
        dispatch(playerActions.createPlayer(name))
    }, [dispatch, savePlayer]);


    const updatePlayer = useCallback((id: string, newName: string, isActive) => {
        dispatch(
            playerActions.updatePlayer(new Player(id, newName, isActive))
        );
    }, [dispatch, player]);


    const deletePlayer = useCallback(() => {
        setIsDeleteDialogShown(false)
        dispatch(
            playerActions.updatePlayer(new Player(player.id, player.name, false))
        );
    }, [dispatch, player]);


    if (isEditMode) {
        return (
            <View style={styles.mainContainer}>
                <IconButton size={23} icon={"eye-off"} color={"red"} onPress={() => {
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
                                player.id === "" ? createPlayer(name) : updatePlayer(player.id, name, player.isActive)
                            }}
                        />
                    </View>
                    <View style={styles.editButtonsStyle}>
                        <IconButton size={23} icon={"check"} color={Colors.secondary} onPress={() => {
                            setIsEditMode(false)
                            setIsAdding(false)
                            player.id === "" ? createPlayer(name) : updatePlayer(player.id, name, player.isActive)
                        }}/>
                    </View>

                </View>


                <Portal>
                    <Dialog visible={isDeleteDialogShown} onDismiss={() => setIsDeleteDialogShown(false)}>
                        <Dialog.Title>Warnung</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Spieler "{name}" wirklich ausplenden?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setIsDeleteDialogShown(false)}>Abbrechen</Button>
                            <Button color={"red"} onPress={deletePlayer}>Ausblenden</Button>
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
                <TouchableComponent style={styles.touchableContainer}
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