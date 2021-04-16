import { combineReducers } from 'redux';

import playerReducer from '../player/playerReducer';
import scoringReducer from '../scoring/scoringReducer';
import errorReducer from './errorReducer';

export const rootReducer = combineReducers({
    players: playerReducer,
    scores: scoringReducer,
    errors: errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
