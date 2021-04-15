import {combineReducers} from 'redux';

import playerReducer from "../../player/store/playerReducer";
import scoringReducer from "../../scoring/store/scoringReducer";
import errorReducer from "./errorReducer";

export const rootReducer = combineReducers({
    players: playerReducer,
    scores: scoringReducer,
    errors: errorReducer
})

export type RootState = ReturnType<typeof rootReducer>