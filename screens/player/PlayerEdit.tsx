import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useSelector} from "react-redux";
import {RootState} from "../../stores/main/RootReducer";
import EditPlayer from "./items/editPlayer";
import Player from "../../models/player/player";
import Colors from '../../constants/Colors';

const PlayerEdit = ({navigation}) => {
    const allPlayer = useSelector((state: RootState) => state.players.allPlayers).filter((player) => player.isActive);

    // states
    const [isAdding, setIsAdding] = useState(false);

    return (
        <ScrollView>
            <View style={styles.main}>
                {allPlayer.length > 0 ? (
                    allPlayer.map((player: Player) => {
                        return (
                            <EditPlayer
                                key={player.id}
                                player={player}
                                setIsAdding={setIsAdding}
                            />
                        );
                    })
                ) : (
                    <Text style={styles.defaultTextStyle}>
                        Noch keine Spieler vorhanden. Lege zuerst Spieler an.
                    </Text>
                )}
                {isAdding ? (
                    <EditPlayer
                        setIsAdding={setIsAdding}
                    />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button style={styles.buttonStyle}
                                icon={'account-plus'}
                                color={Colors.secondary}
                                onPress={() => {
                                    setIsAdding(true);
                                }}
                        >
                            Neuen Spieler anlegen
                        </Button>
                    </View>

                )}
            </View>
        </ScrollView>

    );

};

const styles = StyleSheet.create({
    main: {
        marginTop: 10,
    },
    buttonContainer: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryBackground,
        alignItems: 'center'
    },
    buttonStyle: {
        color: Colors.secondary,
        width: '90%'
    },
    defaultTextStyle: {
        textAlign: 'center',
        padding: 5
    }
});

export const screenOptions = () => {
    return {
        headerTitle: 'Spieler bearbeiten'
    };
};

export default PlayerEdit;
