import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Checkbox, Paragraph,} from 'react-native-paper';
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
            {status !== "indeterminate" ?
                <TouchableComponent
                    style={styles.touchableContainer}
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
                </TouchableComponent> :
                <View style={styles.untouchableContainer}>
                    <View style={styles.verticalCentered}>
                        <Paragraph>{player.name}</Paragraph>
                    </View>
                    <Checkbox.Android
                        status={status}
                        onPress={() => {
                            setOneCheckablePlayer(player.id);
                        }}
                    />
                </View>
            }
        </View>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    touchableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#bbb',
        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible'
    },
    untouchableContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#bbb',
        backgroundColor: '#dedede'
    },
    verticalCentered: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default CheckablePlayer;
