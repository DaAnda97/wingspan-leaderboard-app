import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Avatar, Drawer, Subheading} from 'react-native-paper';

import ScoringNavigator from "./ScoringNavigator";
import PlayerEdit from "../screens/player/PlayerEdit";
import Leaderboard from "../screens/leaderboard/Leaderboard";
import SettingsOverview from "../screens/settings/SettingsOverview";
import Styles from "../constants/Styles";
import i18n from 'i18n-js';

const DrawerContent = (props) => {
    const [active, setActive] = React.useState('ScoringNavigator');

    const navigateTo = (componentName: string) => {
        setActive(componentName)
        props.navigation.navigate(componentName)
        props.navigation.closeDrawer();
    }

    return (
       <SafeAreaView style={Styles.safeArea}>

           <Drawer.Section>
               <View style={styles.userInfoSection}>
                   <Avatar.Image
                       source={require("../assets/icon.png")}
                       size={50}
                   />
                   <Subheading style={styles.title}>Wingspan Leaderboard</Subheading>
               </View>
           </Drawer.Section>

           <Drawer.Section>
               <Drawer.Item
                   icon={"medal-outline"}
                   label={i18n.translate('score_overview')}
                   active={active === 'ScoringNavigator'}
                   onPress={() => navigateTo('ScoringNavigator')}
               />
               <Drawer.Item
                   icon={"podium-gold"}
                   label={i18n.translate('leaderboard')}
                   active={active === 'Leaderboard'}
                   onPress={() => navigateTo('Leaderboard')}
               />
               <Drawer.Item
                   icon={"account-multiple-outline"}
                   label={i18n.translate('player_overview')}
                   active={active === 'PlayerEdit'}
                   onPress={() => navigateTo('PlayerEdit')}
               />
           </Drawer.Section>

           <Drawer.Item
               icon={"tune"}
               label={i18n.translate('settings')}
               active={active === 'Settings'}
               onPress={() => navigateTo('Settings')}
           />
       </SafeAreaView>
    );
}


const DrawerNavigator = createDrawerNavigator();
export const MainNavigator = () => {

    return (
        <DrawerNavigator.Navigator drawerContent={(props) => <DrawerContent {...props}/>}>
            <DrawerNavigator.Screen
                name="ScoringNavigator"
                component={ScoringNavigator}
            />
            <DrawerNavigator.Screen
                name="Leaderboard"
                component={Leaderboard}
            />
            <DrawerNavigator.Screen
                name="PlayerEdit"
                component={PlayerEdit}
            />
            <DrawerNavigator.Screen
                name="Settings"
                component={SettingsOverview}
            />
        </DrawerNavigator.Navigator>
    );
};

const styles = StyleSheet.create({
    userInfoSection: {
        padding: 10,
        flexDirection: "row",
    },
    title: {
        marginLeft: 10,
        marginTop: 20,
        fontWeight: 'bold',
    },
});