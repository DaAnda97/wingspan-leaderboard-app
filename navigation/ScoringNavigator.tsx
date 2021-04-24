import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PlayerSelectionScreen, {screenOptions as playerSelectionScreenOptions} from '../screens/player/PlayerSelection';
import PlayerEditScreen, {screenOptions as playerEditScreenOptions} from '../screens/player/PlayerEdit';
import ScoringInputScreen, {screenOptions as scoringInputScreenOptions} from '../screens/scoring/ScoringInput';
import ScoringOverviewScreen, {screenOptions as scoringOverviewScreenOptions} from '../screens/scoring/ScoringOverview';
import GameSheetOverviewScreen, {screenOptions as gameSheetOverviewScreenOptions} from '../screens/gameSheet/GameSheetOverview';
import SettingsScreen, {screenOptions as settingsScreenOptions} from '../screens/settings/SettingsOverview';

import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const defaultNavOptions = {
    headerTintColor: Colors.primary,
    headerTitleStyle: {},
    headerBackTitleStyle: {
        fontSize: 12,
        color: Colors.primary
    },
    headerBackTitle: 'Zurück'
};

const ScoringStackNavigator = createStackNavigator();

function ScoringNavigator() {
    return (
        <ScoringStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ScoringStackNavigator.Screen
                name="GameSheetOverview"
                component={GameSheetOverviewScreen}
                options={gameSheetOverviewScreenOptions}
            />
            <ScoringStackNavigator.Screen
                name="ScoringOverview"
                component={ScoringOverviewScreen}
                options={scoringOverviewScreenOptions}
            />
            <ScoringStackNavigator.Screen
                name="PlayerSelection"
                component={PlayerSelectionScreen}
                options={playerSelectionScreenOptions}
            />
            <ScoringStackNavigator.Screen
                name="PlayerEdit"
                component={PlayerEditScreen}
                options={playerEditScreenOptions}
            />
            <ScoringStackNavigator.Screen
                name="ScoringInput"
                component={ScoringInputScreen}
                options={scoringInputScreenOptions}
            />
            <ScoringStackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
                options={settingsScreenOptions}
            />
        </ScoringStackNavigator.Navigator>

    );
}

export const screenOptions = () => {
    return {
        tabBarLabel: 'Spielwertung',
        tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
                name={focused ? 'medal' : 'medal-outline'}
                color={color}
                size={22}
            />
        )
    };
};

export default ScoringNavigator;
