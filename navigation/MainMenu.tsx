import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<{}>;

};

const MainMenu = ({ navigation}: Props) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}>
                    <Menu.Item icon={"medal"} onPress={() => {navigation.navigate("GameSheetOverview")}} title="Spielwertung" />
                    <Menu.Item icon={"account-multiple"} onPress={() => {navigation.navigate("PlayerEdit")}} title="Spielerübersicht" />
                    <Divider />
                    <Menu.Item icon={"tune"} onPress={() => {navigation.navigate("Settings")}} title="Einstellungen" />
                </Menu>
            </View>
        </Provider>
    );
};

export default MainMenu;