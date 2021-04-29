import React, {useCallback, useState} from 'react';
import {DevSettings, StyleSheet, View} from 'react-native';
import {Appbar, Button, Dialog, IconButton, Paragraph, Portal} from 'react-native-paper';
import Colors from "../../constants/Colors";
import { dropScoresTable, createScoresTable } from '../../repositories/scoringRepository';
import { dropGameSheetsTable, createGameSheetsTable } from '../../repositories/gameSheetRepository';
import { dropPlayersTable, createPlayersTable } from '../../repositories/playerRepository';


const SettingsOverview = ({navigation}) => {
    const [isResetDialogShown, setIsResetDialogShown] = useState(false)

    const dropHandler = useCallback(() => {
        dropGameSheetsTable()
        dropScoresTable()
        dropPlayersTable()

        createGameSheetsTable()
        createScoresTable()
        createPlayersTable()

        DevSettings.reload()
    }, []);

    return (
        <View>
            <Appbar.Header theme={{ colors: { primary: "white" } }}>
                <IconButton
                    icon={'menu'}
                    color={Colors.primary}
                    size={30}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
                <Appbar.Content
                    color={Colors.primary}
                    title={"Einstellungen"}
                />
            </Appbar.Header>


            <View style={styles.cautionButtonContainer}>
                <Button
                    style={styles.cautionButtonStyle}
                    icon={'delete'}
                    color={Colors.cation}
                    onPress={() => {
                        setIsResetDialogShown(true)
                    }}
                >
                    Alle Daten löschen
                </Button>
            </View>


            <Portal>
                <Dialog
                    visible={isResetDialogShown}
                    onDismiss={() => setIsResetDialogShown(false)}
                >
                    <Dialog.Title>Warnung</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Wirklich alle Daten löschen und die App zurücksetzen? Gelöschte Daten sind NICHT wiederherstellbar.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsResetDialogShown(false)}>
                            Abbrechen
                        </Button>
                        <Button
                            color={Colors.cation}
                            onPress={() => {
                                setIsResetDialogShown(false)
                                dropHandler()
                            }}>
                                Bestätigen
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>

    );

};

const styles = StyleSheet.create({
    main: {
        marginTop: 15,
    },
    cautionButtonContainer: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.cation,
        backgroundColor: Colors.cautionBackground,
        alignItems: 'center'
    },
    cautionButtonStyle: {
        color: Colors.cation,
        width: '100%'
    },
    buttonContainer: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryBackground,
        alignItems: 'center'
    },
    buttonStyle: {
        color: Colors.primary,
        width: '100%'
    },
    defaultTextStyle: {
        textAlign: 'center',
        padding: 5
    },
});


export default SettingsOverview;