import { combineReducers } from 'redux';

import playerReducer from '../player/playerReducer';
import scoringReducer from '../scoring/scoringReducer';
import gameSheetReducer from "../gameSheet/gameSheetReducer";
import errorReducer from './errorReducer';

export const rootReducer = combineReducers({
    players: playerReducer,
    scores: scoringReducer,
    gameSheets: gameSheetReducer,
    errors: errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
