import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Avatar, Drawer, Subheading} from 'react-native-paper';

import ScoringNavigator from "./ScoringNavigator";
import PlayerEdit from "../screens/player/PlayerEdit";
import SettingsOverview from "../screens/settings/SettingsOverview";
import Styles from "../constants/Styles";

const DrawerNavigator = createDrawerNavigator();

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
                   label="Ergebnisübersicht"
                   active={active === 'ScoringNavigator'}
                   onPress={() => navigateTo('ScoringNavigator')}
               />
               <Drawer.Item
                   icon={"account-multiple-outline"}
                   label="Spielerübersicht"
                   active={active === 'PlayerEdit'}
                   onPress={() => navigateTo('PlayerEdit')}
               />
           </Drawer.Section>

           <Drawer.Item
               icon={"tune"}
               label="Einstellungen"
               active={active === 'Settings'}
               onPress={() => navigateTo('Settings')}
           />
       </SafeAreaView>
    );
}




export const MainNavigator = () => {
    return (
        <DrawerNavigator.Navigator drawerContent={(props) => <DrawerContent {...props}/>}>
            <DrawerNavigator.Screen name="ScoringNavigator" component={ScoringNavigator} />
            <DrawerNavigator.Screen name="PlayerEdit" component={PlayerEdit} />
            <DrawerNavigator.Screen name="Settings" component={SettingsOverview} />
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