import React, {useEffect} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {composeWithDevTools} from 'redux-devtools-extension';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import 'intl';
import 'intl/locale-data/jsonp/de';

import Colors from './constants/Colors';
import ScoringNavigator from './navigation/ScoringNavigator';
import {rootReducer} from './stores/main/RootReducer';
import {createScoresTable} from './repositories/scoringRepository';
import {createGameSheetsTable} from './repositories/gameSheetRepository';
import {createPlayersTable} from './repositories/playerRepository';
import {NavigationContainer} from "@react-navigation/native";
import {MainNavigator} from "./navigation/MainNavigator";

const createTables = () => {
    createPlayersTable();
    createGameSheetsTable();
    createScoresTable();
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

    useEffect(
        () => {
            createTables();
        },
        [] // The empty array ensures it is called only once, on the first render.
    );

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
