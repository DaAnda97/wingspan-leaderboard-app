import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Colors from "./constants/Colors";
import TabScreenNavigator from "./domains/main/navigation/TapScreenNavigator";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./domains/main/store/RootReducer";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        accent: Colors.secondary
    }
};

export default function App() {
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

