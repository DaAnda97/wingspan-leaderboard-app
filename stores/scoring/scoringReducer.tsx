import Scoring from '../../models/scoring/scoring';
import {
    CREATE_SCORING,
    DELETE_SCORING,
    UPDATE_SCORING,
    PERSIST_SCORES, LOAD_SCORES_FROM_DB,
} from './scoringActions';

const initialState = {
    unsavedGameSheetId: Math.random().toString(36).substring(2),
    unsavedScores: new Array<Scoring>(),
    savedScores: new Array<Scoring>(),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SCORING:
            const newScoring: Scoring = new Scoring(
                action.id,
                action.scoringData.gameSheetId,
                action.scoringData.playerId,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            );

            return {
                ...state,
                unsavedGameSheetId: state.unsavedGameSheetId,
                unsavedScores: [...state.unsavedScores, newScoring],
                savedScores: state.savedScores
            };

        case UPDATE_SCORING:
            const updatedScoringIndex = state.unsavedScores.findIndex(
                (score) => score.id === action.id
            );
            const totalScore =
                action.scoringData.roundPoints +
                action.scoringData.bonusPoints +
                action.scoringData.eggPoints +
                action.scoringData.foodPoints +
                action.scoringData.nectarPoints +
                action.scoringData.birdsPoints +
                action.scoringData.cardPoints;

            const updatedScoring: Scoring = new Scoring(
                action.id,
                action.scoringData.gameSheetId,
                action.scoringData.playerId,
                action.scoringData.roundPoints,
                action.scoringData.bonusPoints,
                action.scoringData.eggPoints,
                action.scoringData.foodPoints,
                action.scoringData.nectarPoints,
                action.scoringData.birdsPoints,
                action.scoringData.cardPoints,
                totalScore
            );

            const updatedScores = [...state.unsavedScores];
            updatedScores[updatedScoringIndex] = updatedScoring;

            return {
                ...state,
                unsavedGameSheetId: state.unsavedGameSheetId,
                unsavedScores: updatedScores,
                savedScores: state.savedScores
            };

        case DELETE_SCORING:
            return {
                ...state,
                unsavedGameSheetId: state.unsavedGameSheetId,
                unsavedScores: state.unsavedScores.filter((score) => score.id !== action.id),
                savedScores: state.savedScores
            };

        case LOAD_SCORES_FROM_DB:
            return {
                ...state,
                unsavedGameSheetId: state.unsavedGameSheetId,
                unsavedScores: state.unsavedScores,
                savedScores: action.loadedScores
            };

        case PERSIST_SCORES:
            return {
                ...state,
                unsavedGameSheetId: Math.random().toString(36).substring(2),
                unsavedScores: [],
                savedScores: action.loadedScores
            };
    }

    //default
    return state;
};
