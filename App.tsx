import React, {useState} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {composeWithDevTools} from 'redux-devtools-extension';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import Colors from './constants/Colors';
import {rootReducer} from './stores/main/RootReducer';
import {createScoresTable} from './repositories/scoringRepository';
import {createGameSheetsTable} from './repositories/gameSheetRepository';
import {createPlayersTable} from './repositories/playerRepository';
import {MainNavigator} from "./navigation/MainNavigator";
import * as localize from "./localization/localize"


const init = async () => {
    await createPlayersTable();
    await createGameSheetsTable();
    await createScoresTable();

    await localize.initI18n()
};


let store;
if (__DEV__) {
    store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(ReduxThunk))
    );
} else {
    store = createStore(rootReducer, applyMiddleware(ReduxThunk));
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        accent: Colors.secondary
    }
};

export default function App() {
    const [isInitialized, setIsInitialized] = useState(false)

    if (!isInitialized) {
        return (
            <AppLoading
                startAsync={init}
                onFinish={() => {
                    setIsInitialized(true)
                }}
                onError={console.warn}
            />
        );
    }
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <MainNavigator/>
                    </NavigationContainer>
                </SafeAreaProvider>
            </PaperProvider>
        </StoreProvider>
    );
}
