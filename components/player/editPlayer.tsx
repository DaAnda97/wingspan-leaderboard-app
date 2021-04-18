import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
    Button,
    Dialog,
    IconButton,
    Paragraph,
    Portal,
    TextInput
} from 'react-native-paper';
import Player from '../../models/player/player';
import Colors from '../../constants/Colors';
import * as playerActions from '../../stores/player/playerActions';

type Props = {
    player?: Player;
    setIsAdding: (isAdding: boolean) => void;
};


const EditPlayer = ({player = new Player('', '', true), setIsAdding}: Props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(player.name);
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(player.name === '');

    const createPlayer = useCallback((playerName: string) => {
            dispatch(playerActions.createPlayer(playerName));
        },
        [dispatch]
    );

    const updatePlayer = useCallback((id: string, newName: string, isActive) => {
            dispatch(
                playerActions.updatePlayer(new Player(id, newName, isActive))
            );
        },
        [dispatch]
    );

    const deletePlayer = useCallback(() => {
        setIsDeleteDialogShown(false);
        dispatch(
            playerActions.updatePlayer(
                new Player(player.id, player.name, false)
            )
        );
    }, [dispatch, player]);

    if (isEditMode) {
        return (
            <View style={styles.mainContainer}>
                <IconButton
                    size={23}
                    icon={'eye-off'}
                    color={'red'}
                    onPress={() => {
                        player.id === ''
                            ? setIsAdding(false)
                            : setIsDeleteDialogShown(true);
                    }}
                />

                <View style={styles.contentContainer}>
                    <View style={styles.editButtonsStyle}>
                        <IconButton
                            size={23}
                            icon={'close'}
                            color={Colors.secondary}
                            onPress={() => {
                                player.id === ''
                                    ? setIsAdding(false)
                                    : setIsEditMode(false);
                            }}
                        />
                    </View>
                    <View style={styles.horizontalCentered}>
                        <TextInput
                            value={name}
                            onChangeText={(input) => setName(input)}
                            onSubmitEditing={() => {
                                setIsEditMode(false);
                                setIsAdding(false);
                                player.id === ''
                                    ? createPlayer(name)
                                    : updatePlayer(
                                    player.id,
                                    name,
                                    player.isActive
                                    );
                            }}
                        />
                    </View>
                    <View style={styles.editButtonsStyle}>
                        <IconButton
                            size={23}
                            icon={'check'}
                            color={Colors.secondary}
                            onPress={() => {
                                setIsEditMode(false);
                                setIsAdding(false);
                                player.id === '' ? createPlayer(name) : updatePlayer(player.id, name, player.isActive);
                            }}
                        />
                    </View>
                </View>

                <Portal>
                    <Dialog
                        visible={isDeleteDialogShown}
                        onDismiss={() => setIsDeleteDialogShown(false)}
                    >
                        <Dialog.Title>Warnung</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                Spieler "{name}" wirklich ausplenden?
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => setIsDeleteDialogShown(false)}
                            >
                                Abbrechen
                            </Button>
                            <Button color={'red'} onPress={deletePlayer}>
                                Ausblenden
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <IconButton
                size={23}
                icon={'pencil-outline'}
                color={Colors.secondary}
                onPress={() => {
                    setIsEditMode(true);
                }}
            />
            <View style={styles.contentContainer}>
                <View style={styles.verticalCentered}>
                    <Paragraph>{player.name}</Paragraph>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    editButtonsStyle: {
        padding: 5
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: '#bbb',
    },
    verticalCentered: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    horizontalCentered: {
        flex: 1,
        width: '100%'
    }
});

export default EditPlayer;