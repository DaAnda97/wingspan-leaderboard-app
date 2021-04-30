import React, {useCallback, useState} from 'react';
import {DevSettings, StyleSheet, View} from 'react-native';
import {useDispatch} from "react-redux";
import {
    Appbar,
    Button,
    Dialog,
    IconButton,
    Menu,
    Paragraph,
    Portal,
    Subheading,
} from 'react-native-paper';
import i18n from 'i18n-js';
import Colors from "../../constants/Colors";
import {dropScoresTable, createScoresTable} from '../../repositories/scoringRepository';
import {dropGameSheetsTable, createGameSheetsTable} from '../../repositories/gameSheetRepository';
import {dropPlayersTable, createPlayersTable} from '../../repositories/playerRepository';
import {updateLanguage} from "../../localization/localize";


const SettingsOverview = ({navigation}) => {
    const dispatch = useDispatch();
    const [currentLanguage] = useState<string>(i18n.locale)
    const [showDropDown, setShowDropDown] = useState(false);
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


    const setLanguage = useCallback((lang: string) => {
        updateLanguage(lang).then(r => {
            DevSettings.reload()
        })
    }, [dispatch]);

    return (
        <View style={styles.main}>
            <Appbar.Header theme={{colors: {primary: "white"}}}>
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
                    title={i18n.translate('settings')}
                />
            </Appbar.Header>

            <View style={styles.main}>

                <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownText}>
                        <Subheading>{i18n.translate('language')}</Subheading>
                    </View>
                    <Menu
                        visible={showDropDown}
                        onDismiss={() => setShowDropDown(false)}
                        anchor={
                            <View style={styles.dropdownButton}>
                                <Button onPress={() => setShowDropDown(true)} icon={'menu-down'}>
                                    {currentLanguage === "en" ? i18n.translate('english') : i18n.translate('german')}
                                </Button>
                            </View>

                        }
                    >
                        <Menu.Item onPress={() => {setLanguage("de")}} title={i18n.translate('german')} />
                        <Menu.Item onPress={() => {setLanguage("en")}} title={i18n.translate('english')}/>
                    </Menu>
                </View>


                <View style={styles.cautionButtonContainer}>
                    <Button
                        style={styles.cautionButtonStyle}
                        icon={'delete'}
                        color={Colors.cation}
                        onPress={() => {
                            setIsResetDialogShown(true)
                        }}
                    >
                        {i18n.translate('delete_data_button')}
                    </Button>
                </View>


            </View>

            <Portal>
                <Dialog
                    visible={isResetDialogShown}
                    onDismiss={() => setIsResetDialogShown(false)}
                >
                    <Dialog.Title>{i18n.translate('warning')}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            {i18n.translate('really_delete_data')}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsResetDialogShown(false)}>
                            {i18n.translate('cancel')}
                        </Button>
                        <Button
                            color={Colors.cation}
                            onPress={() => {
                                setIsResetDialogShown(false)
                                dropHandler()
                            }}>
                            {i18n.translate('confirm')}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );

};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    dropdownContainer: {
        flexDirection: 'row',
        margin: 10
    },
    dropdownText: {
        alignSelf: "center",
        marginRight: 5
    },
    dropdownButton: {
        borderWidth: 0.5,
        borderColor: Colors.primary,
        margin: 2,
        borderRadius: 5
    },
    cautionButtonContainer: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.cation,
        backgroundColor: Colors.cautionBackground,
        flexDirection: "row",
        position: 'absolute',
        bottom: 0,
        flex: 1
    },
    cautionButtonStyle: {
        color: Colors.cation,
        width: '100%'
    },
});


export default SettingsOverview;
