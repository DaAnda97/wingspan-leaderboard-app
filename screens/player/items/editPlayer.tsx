import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
    Button,
    Dialog, HelperText,
    IconButton,
    Paragraph,
    Portal,
    TextInput
} from 'react-native-paper';
import Player from '../../../models/player/player';
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';
import * as playerActions from '../../../stores/player/playerActions';

type Props = {
    player?: Player;
    players: Array<Player>
    setIsAdding: (isAdding: boolean) => void;
};


const EditPlayer = ({player = new Player('', '', true), players, setIsAdding}: Props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(player.name);
    const [isDeleteDialogShown, setIsErrorDialogShown] = useState(false);
    const [errorInfo, setErrorInfo] = useState<string>('');
    const [isEditMode, setIsEditMode] = useState<boolean>(player.name === '');


    // methods
    const checkNameIsValid = useCallback(() => {
        const playerNames: Array<string> = players.filter(cPlayer => cPlayer !== player).map(player => player.name)

        if (playerNames.includes(name)) {
            return "Dieser Name ist bereits vergeben"
        } else if (name.length <= 1) {
            return "Ein Name besteht aus mindestens zwei Buchstaben"
        } else if (name.length > 9) {
            return "Ein Name kann max. 9 Buchstaben haben"
        } else {
            return ""
        }
    }, [name])

    useEffect(() => {
        setErrorInfo(checkNameIsValid())
    }, [name])

    // dispatch
    const createPlayer = useCallback((playerName: string) => {
            if (checkNameIsValid() === "") {
                setIsEditMode(false);
                setIsAdding(false);
                dispatch(playerActions.createPlayer(playerName));
            } else {
                setIsErrorDialogShown(true)
            }
        }, [dispatch, checkNameIsValid, name]
    );

    const updatePlayer = useCallback((id: string, newName: string, isActive) => {
            if (checkNameIsValid() === "") {
                setIsEditMode(false);
                setIsAdding(false);
                dispatch(playerActions.updatePlayer(new Player(id, newName, isActive)));
            } else {
                setIsErrorDialogShown(true)
            }
        }, [dispatch, checkNameIsValid, name]
    );

    const hidePlayer = useCallback(() => {
        dispatch(
            playerActions.updatePlayer(
                new Player(player.id, player.name, false)
            )
        );
    }, [dispatch, player]);

    if (isEditMode) {
        return (

            <View style={styles.mainContainer}>
                {player.name !== ''
                    ?
                    <IconButton
                        size={23}
                        icon={'eye-off'}
                        color={'red'}
                        onPress={() => {
                            player.id === ''
                                ? setIsAdding(false)
                                : hidePlayer()
                        }}
                    />
                    : <View style={{paddingRight: 10}}></View>
                }
                <View style={styles.editContainer}>
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
                                    player.id === ''
                                        ? createPlayer(name)
                                        : updatePlayer(player.id, name, player.isActive);
                                }}
                            />
                        </View>
                        <View style={styles.editButtonsStyle}>
                            <IconButton
                                size={23}
                                icon={'check'}
                                color={Colors.secondary}
                                onPress={() => {
                                    player.id === '' ? createPlayer(name) : updatePlayer(player.id, name, player.isActive);
                                }}
                            />
                        </View>
                    </View>
                    {errorInfo !== "" &&
                    <View style={Styles.centered}>
                        <HelperText type={"error"}>
                            {errorInfo}
                        </HelperText>
                    </View>

                    }
                </View>


                <Portal>
                    <Dialog
                        visible={isDeleteDialogShown}
                        onDismiss={() => setIsErrorDialogShown(false)}
                    >
                        <Dialog.Title>Fehlerhafte Eingabe</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                Bitte zuerst die fehlerhafte Eingabe korrigieren: {errorInfo}
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => setIsErrorDialogShown(false)}
                            >
                                Ok
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
            <View style={styles.nameContainer}>
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
        alignItems: 'center',
        marginTop: 5
    },
    editContainer: {
        borderWidth: 0.5,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 10,
        borderColor: '#bbb',
        flex: 1,
        paddingVertical: 5,
    },
    nameContainer: {
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
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
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