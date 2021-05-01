import { combineReducers } from 'redux';

import playerReducer from '../player/playerReducer';
import scoringReducer from '../scoring/scoringReducer';
import gameSheetReducer from "../gameSheet/gameSheetReducer";
import settingsReducer from "../settings/settingsReducer";
import errorReducer from './errorReducer';

export const rootReducer = combineReducers({
    players: playerReducer,
    scores: scoringReducer,
    gameSheets: gameSheetReducer,
    settings: settingsReducer,
    errors: errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
