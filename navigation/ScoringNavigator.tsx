import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import i18n from 'i18n-js';

import PlayerSelectionScreen from '../screens/player/PlayerSelection';
import ScoringInputScreen from '../screens/scoring/ScoringInput';
import ScoringOverviewScreen from '../screens/scoring/ScoringOverview';
import GameSheetOverviewScreen from '../screens/gameSheet/GameSheetOverview';

import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerTintColor: Colors.primary,
    headerTitleStyle: {},
    headerBackTitleStyle: {
        fontSize: 12,
        color: Colors.primary
    },
    headerBackTitle: i18n.translate('back')
};

const ScoringStackNavigator = createStackNavigator();

function ScoringNavigator() {
    return (
        <ScoringStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ScoringStackNavigator.Screen
                name="GameSheetOverview"
                component={GameSheetOverviewScreen}
                options={{headerTitle: i18n.translate('score_overview')}}
            />
            <ScoringStackNavigator.Screen
                name="ScoringOverview"
                component={ScoringOverviewScreen}
                options={{headerTitle: i18n.translate("game_overview")}}
            />
            <ScoringStackNavigator.Screen
                name="PlayerSelection"
                component={PlayerSelectionScreen}
                options={{headerTitle: i18n.translate('select_player')}}
            />
            <ScoringStackNavigator.Screen
                name="ScoringInput"
                component={ScoringInputScreen}
                options={{headerTitle: i18n.translate('scoring')}}
            />
        </ScoringStackNavigator.Navigator>

    );
}

export default ScoringNavigator;
