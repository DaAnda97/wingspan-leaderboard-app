import {UPDATE_SETTINGS} from "./settingsActions";


const initialState = {
    isEuropeanEnabled: true,
    isPacificEnabled: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                isEuropeanEnabled: action.isEuropeanEnabled,
                isPacificEnabled: action.isPacificEnabled,
            };
    }

    //default
    return state;
};
