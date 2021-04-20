import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
    Checkbox,
    Paragraph,
} from 'react-native-paper';
import Player from '../../../models/player/player';
import TouchableComponent from '../../../components/TouchableComponent';
import Status from "../../../models/player/CheckBoxStatus";

type Props = {
    player: Player;
    setOneCheckablePlayer: (playerId: string) => void;
    status: Status
};


const CheckablePlayer = ({player, setOneCheckablePlayer, status}: Props) => {

    return (
        <View style={styles.mainContainer}>
            <TouchableComponent
                style={styles.contentContainer}
                onPress={() => setOneCheckablePlayer(player.id)}
            >
                <View style={styles.verticalCentered}>
                    <Paragraph>{player.name}</Paragraph>
                </View>
                <Checkbox.Android
                    status={status}
                    onPress={() => {
                        setOneCheckablePlayer(player.id);
                    }}
                />
            </TouchableComponent>
        </View>
    );

}

const styles = StyleSheet.create({
    editContainer: {
        flex: 1,
        paddingVertical: 15,
        elevation: 0,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderColor: '#bbb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    editButtonsStyle: {
        padding: 5
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 0,
        borderRadius: 10,
        marginVertical: 3,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#bbb',
        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible'
    },
    verticalCentered: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    horizontalCentered: {
        flex: 1,
        width: '100%'
    }
});

export default CheckablePlayer;