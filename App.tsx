import React, {useEffect} from 'react';
import {Provider as StoreProvider, useDispatch} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Colors from "./constants/Colors";
import TabScreenNavigator from "./navigation/TapScreenNavigator";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./stores/main/RootReducer";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {composeWithDevTools} from 'redux-devtools-extension';
import {createScoresTable} from "./repositories/scoringRepository";
import {createScoringSheetsTable} from "./repositories/scoringSheetRepositroy"
import {createPlayersTable} from "./repositories/playerRepository"

import * as playerActions from "./stores/player/playerActions"

const createTables = () => {
    createPlayersTable()
    createScoringSheetsTable()
    createScoresTable()
}



let store;
if (__DEV__) {
    store =
        createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(ReduxThunk))
        )
} else {
    store = createStore(rootReducer, applyMiddleware(ReduxThunk))
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

    useEffect(() => {
        createTables();
    }, [] //The empty array ensures it is called only once, on the first render.
    );

    return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <TabScreenNavigator/>
                </SafeAreaProvider>
            </PaperProvider>
        </StoreProvider>
    );
}

