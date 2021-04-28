import {StyleSheet, Platform, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    shadow: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});

export default styles;
