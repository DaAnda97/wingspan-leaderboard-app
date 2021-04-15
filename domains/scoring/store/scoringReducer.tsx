import Scoring from "../model/scoring";
import {CREATE_SCORING, DELETE_SCORING, LOAD_SCORES_FROM_DB, UPDATE_SCORING} from "./scoringActions";

const initialState = {
    allScores: Array<Scoring>()
}


export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_SCORING:
            const newScoring: Scoring = new Scoring(
                action.id,
                action.scoringData.scoringSheetId,
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
                allScores: [...state.allScores, newScoring]
            };


        case UPDATE_SCORING:
            const updatedScoringIndex = state.allScores.findIndex(score => score.id === action.id)
            const totalScore = action.scoringData.roundPoints + action.scoringData.bonusPoints + action.scoringData.eggPoints
                + action.scoringData.foodPoints + action.scoringData.nectarPoints + action.scoringData.birdsPoints + action.scoringData.cardPoints

            const updatedScoring: Scoring = new Scoring(
                action.id,
                action.scoringData.scoringSheetId,
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

            const updatedScores = [...state.allScores]
            updatedScores[updatedScoringIndex] = updatedScoring

            return {
                ...state,
                allScores: updatedScores
            }


        case DELETE_SCORING:
            return {
                ...state,
                allScores: state.allScores.filter(
                    score => score.id !== action.id
                )
            };

        case LOAD_SCORES_FROM_DB:
            console.log(action.allScores)
            return {
                ...state,
                allScores: action.allScores
            }

    }

    //default
    return state;
};