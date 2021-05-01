import AsyncStorage from "@react-native-async-storage/async-storage"

export const initSettings = async () => {
    let isEuropeanEnabledString = await AsyncStorage.getItem('isEuropeanEnabled')
    let isPacificEnabledString = await AsyncStorage.getItem('isPacificEnabled')

    if(isEuropeanEnabledString === null) {
        await AsyncStorage.setItem('isEuropeanEnabled', "false");
        isEuropeanEnabledString = "false"
    }
    if(isPacificEnabledString === null) {
        await AsyncStorage.setItem('isPacificEnabled', "false");
        isPacificEnabledString = "false"
    }

    return {
        "isEuropeanEnabled": isEuropeanEnabledString === "true",
        "isPacificEnabled": isPacificEnabledString === "true"
    }
};

export const updateSettings = async (isEuropeanEnabled: boolean, isPacificEnabled: boolean) => {
    await AsyncStorage.setItem('isEuropeanEnabled', Boolean(isEuropeanEnabled).toString());
    await AsyncStorage.setItem('isPacificEnabled', Boolean(isPacificEnabled).toString());
};
