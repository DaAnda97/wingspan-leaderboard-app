import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Colors from "./constants/Colors";
import TabScreenNavigator from "./navigation/TapScreenNavigator";

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
      <PaperProvider theme={theme}>
          <TabScreenNavigator/>
      </PaperProvider>
  );
}

