import {LOAD_GAME_SHEETS_FROM_DB} from "./gameSheetActions";
import GameSheet from "../../models/gameSheet/gameSheet";

const initialState = {
    gameSheets : new Array<GameSheet>()
};

export default (state = initialState, action) => {
    switch (action.type) {

        case LOAD_GAME_SHEETS_FROM_DB:
            return {
                ...state,
                gameSheets: action.loadedGameSheets
            };
    }

    //default
    return state;
}
