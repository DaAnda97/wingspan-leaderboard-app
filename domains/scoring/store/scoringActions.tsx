import * as repoActions from "../repository/scoringRepository";
import CustomError from "../../main/model/customError";
import * as errorActions from "../../main/store/errorAction";
import Scoring from "../model/scoring";

export const CREATE_SCORING = 'CREATE_SCORING';
export const UPDATE_SCORING = 'UPDATE_SCORING';
export const DELETE_SCORING = 'DELETE_SCORING';
export const LOAD_SCORES_FROM_DB = "LOAD_SCORES_FROM_DB"

export const loadScoresFromDb = () => {

    return async dispatch => {

        console.log("test")

        const allScores = await repoActions.loadAllScores()
            .catch((error : Error) =>
                errorActions.newError(new CustomError(error.message + "", JSON.stringify(error, Object.getOwnPropertyNames(error))))
            )

        const allSavedScores = Array<Scoring>()
        allScores.rows.forEach( scoring => {
            const savedScoring = new Scoring(
                scoring.id,
                scoring.scoringSheetId,
                scoring.playerId,
                scoring.roundPoints,
                scoring.bonusPoints,
                scoring.eggPoints,
                scoring.foodPoints,
                scoring.nectarPoints,
                scoring.birdPoints,
                scoring.cardPoints,
                scoring.totalScore
            )

            allSavedScores.push(savedScoring)
        })
        return dispatch({
            type: LOAD_SCORES_FROM_DB,
            allScores: allSavedScores
        })
    }


}

export const createScoring = (scoringSheetId: string, playerId: string) => {
    return {
        type: CREATE_SCORING,
        scoringData: {
            scoringSheetId,
            playerId,
        }
    };
};

export const updateScoring = (id: string, scoringSheetId: string, playerId: string, roundPoints: number, bonusPoints: number,
                              eggPoints: number, foodPoints: number, nectarPoints: number, birdsPoints: number, cardPoints: number) => {

    return {
        type: UPDATE_SCORING,
        id: id,
        scoringData: {
            scoringSheetId,
            playerId,
            roundPoints,
            bonusPoints,
            eggPoints,
            foodPoints,
            nectarPoints,
            birdsPoints,
            cardPoints
        }
    };
};

export const deleteScoring = (scoringId: string) => {
    return {
        type: DELETE_SCORING,
        id: (scoringId)
    };
};
