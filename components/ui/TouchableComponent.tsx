import React from 'react';
import {Surface} from 'react-native-paper';
import {Platform, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';


const TouchableComponent = props => {
    const platform = Platform.OS

    if (platform === 'android') {
        return (
            <View style={{flex: 1}}>
                <TouchableNativeFeedback onPress={props.onPress} useForeground delayPressIn={500}>
                    <Surface style={props.style}>
                        {props.children}
                    </Surface>
                </TouchableNativeFeedback>
            </View>
        );
    } else {
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={props.onPress} activeOpacity={.5}>
                    <Surface style={props.style}>
                        {props.children}
                    </Surface>
                </TouchableOpacity>
            </View>
        );
    }
};


export default TouchableComponent;