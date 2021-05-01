import * as settingsPersist from "./settingsPersist"

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const initSettings = () => {
    return async (dispatch) => {
        const initialSettings = await settingsPersist.initSettings()
        const isEuropeanEnabled = initialSettings.isEuropeanEnabled
        const isPacificEnabled = initialSettings.isPacificEnabled

        dispatch({
            type: UPDATE_SETTINGS,
            isEuropeanEnabled: isEuropeanEnabled,
            isPacificEnabled: isPacificEnabled
        });
    };
}

export const updateSettings = (isEuropeanEnabled: boolean, isPacificEnabled: boolean) => {
    return async (dispatch) => {
        await settingsPersist.updateSettings(isEuropeanEnabled, isPacificEnabled)

        dispatch({
            type: UPDATE_SETTINGS,
            isEuropeanEnabled: isEuropeanEnabled,
            isPacificEnabled: isPacificEnabled
        });
    };
};

