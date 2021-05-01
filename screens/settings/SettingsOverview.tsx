import React, {useCallback, useEffect, useState} from 'react';
import {DevSettings, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {
    Appbar,
    Button,
    Dialog, Divider,
    IconButton,
    Menu,
    Paragraph,
    Portal,
    Subheading, Switch,
} from 'react-native-paper';
import i18n from 'i18n-js';
import * as settingsActions from "../../stores/settings/settingsActions"
import Colors from "../../constants/Colors";
import {dropScoresTable, createScoresTable} from '../../repositories/scoringRepository';
import {dropGameSheetsTable, createGameSheetsTable} from '../../repositories/gameSheetRepository';
import {dropPlayersTable, createPlayersTable} from '../../repositories/playerRepository';
import {updateLanguage} from "../../localization/localize";
import {RootState} from "../../stores/main/RootReducer";


const SettingsOverview = ({navigation}) => {
    const dispatch = useDispatch();
    const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.locale)
    const [showDropDown, setShowDropDown] = useState(false);
    const [isResetDialogShown, setIsResetDialogShown] = useState(false)

    const settings = useSelector((state: RootState) => state.settings)

    const dropHandler = useCallback(() => {
        dropGameSheetsTable()
        dropScoresTable()
        dropPlayersTable()

        createGameSheetsTable()
        createScoresTable()
        createPlayersTable()

        DevSettings.reload()
    }, []);

    const updateSettings = useCallback((isEuropeanEnabled, isPacificEnabled) => {
        dispatch(
            settingsActions.updateSettings(isEuropeanEnabled, isPacificEnabled)
        )
    }, []);

    useEffect(() => {
        dispatch (
            settingsActions.initSettings()
        )
    }, []) // initial


    const setLanguage = useCallback((lang: string) => {
        updateLanguage(lang).then(r => {
            DevSettings.reload()
            setCurrentLanguage(lang)
            setShowDropDown(false)
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

                <View style={styles.rowContainer}>
                    <View style={styles.text}>
                        <Subheading>{i18n.translate('european_extension')}</Subheading>
                    </View>
                    <Switch
                        value={settings.isEuropeanEnabled}
                        onValueChange={() => {
                            updateSettings(!settings.isEuropeanEnabled, settings.isPacificEnabled)
                        }}
                    />
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.text}>
                        <Subheading>{i18n.translate('pacific_extension')}</Subheading>
                    </View>
                    <Switch
                        value={settings.isPacificEnabled}
                        onValueChange={() => {
                            updateSettings(settings.isEuropeanEnabled, !settings.isPacificEnabled)
                        }}
                    />
                </View>

                <Divider/>

                <View style={styles.rowContainer}>
                    <View style={styles.text}>
                        <Subheading>{i18n.translate('language')}</Subheading>
                    </View>
                    <Menu
                        visible={showDropDown}
                        onDismiss={() => setShowDropDown(false)}
                        anchor={
                            <View style={styles.dropdownButton}>
                                <Button onPress={() => setShowDropDown(true)} icon={'menu-down'} color={Colors.secondary}>
                                    {currentLanguage === "en" ? i18n.translate('english') : i18n.translate('german')}
                                </Button>
                            </View>

                        }
                    >
                        <Menu.Item onPress={() => {setLanguage("de")}} title={i18n.translate('german')} />
                        <Menu.Item onPress={() => {setLanguage("en")}} title={i18n.translate('english')}/>
                    </Menu>
                </View>

                <Divider/>


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
    rowContainer: {
        flexDirection: 'row',
        margin: 10
    },
    text: {
        alignSelf: "center",
        textAlign: 'left',
        marginRight: 5
    },
    dropdownButton: {
        borderWidth: 0.5,
        borderColor: Colors.secondary,
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
