import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Colors from "../constants/Colors";
import Analysis, {screenOptions as analysisScreenOptions} from '../screens/AnalysisOverview';
import LeaderboardScreen, {screenOptions as leaderboardScreenOptions} from '../screens/Leaderboard';
import ScoringNavigator, {screenOptions as scoringNavigatorScreenOptions} from '../navigation/ScoringNavigator';


const TabNavigation = createMaterialBottomTabNavigator();

function TabScreenNavigator() {
    return (
        <NavigationContainer>
            <TabNavigation.Navigator
                activeColor={Colors.primary}
                barStyle={{ backgroundColor: 'white' }}
            >
                <TabNavigation.Screen
                    name="ScoringNavigator"
                    component={ScoringNavigator}
                    options={scoringNavigatorScreenOptions}
                />
                <TabNavigation.Screen
                    name="Leaderboard"
                    component={LeaderboardScreen}
                    options={leaderboardScreenOptions}
                />
                <TabNavigation.Screen
                    name="Analysis"
                    component={Analysis}
                    options={analysisScreenOptions}
                />
            </TabNavigation.Navigator>
        </NavigationContainer>
    );
}


export default TabScreenNavigator;