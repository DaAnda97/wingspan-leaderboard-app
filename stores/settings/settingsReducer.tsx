import * as scoringConstants from "../../models/scoring/SCORING_CONSTANTS";
import {UPDATE_SETTINGS} from "./settingsActions";


const initialState = {
    isEuropeanEnabled: true,
    isPacificEnabled: true,
    initialScoringFields: scoringConstants.INITIAL_SCORING_FIELDS_PACIFIC,
    inputRefs: scoringConstants.INPUT_REFS_PACIFIC
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                isEuropeanEnabled: action.isEuropeanEnabled,
                isPacificEnabled: action.isPacificEnabled,
                initialScoringFields: action.isPacificEnabled ? scoringConstants.INITIAL_SCORING_FIELDS_PACIFIC : scoringConstants.INITIAL_SCORING_FIELDS,
                inputRefs: action.isPacificEnabled ? scoringConstants.INPUT_REFS_PACIFIC : scoringConstants.INPUT_REFS
            };
    }

    //default
    return state;
};
