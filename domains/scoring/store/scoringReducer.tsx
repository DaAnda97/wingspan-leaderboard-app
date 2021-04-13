import Scoring from "../model/scoring";
import SCORES from "../../../data/scores";
import {CREATE_SCORING, DELETE_SCORING, UPDATE_SCORING} from "./scoringActions";

const initialState = {
    //allScores: Array<Scoring>()
    allScores: SCORES
}


export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_SCORING:
            const newScoring: Scoring = new Scoring(
                action.scoringData.scoringSheetId + "_" + action.scoringData.playerId,
                action.scoringData.scoringSheetId,
                action.scoringData.playerId,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
            );

            return {
                ...state,
                allDoings: [newScoring, ...state.allScores]
            };


        case UPDATE_SCORING:
            const updatedScoringIndex = state.allScores.findIndex(score => score.id === action.id)

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
                action.scoringData.cardPoints
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
    }

    //default
    return state;
};