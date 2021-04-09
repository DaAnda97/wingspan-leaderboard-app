import {combineReducers} from 'redux';

import playerReducer from "../../player/store/playerReducer";
import scoringReducer from "../../scoring/store/scoringReducer";

export const rootReducer = combineReducers({
    players: playerReducer,
    scores: scoringReducer
})

export type RootState = ReturnType<typeof rootReducer>