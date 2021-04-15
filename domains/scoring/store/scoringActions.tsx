import Scoring from "../model/scoring";
import * as errorActions from "../../main/store/errorAction";
import CustomError from "../../main/model/customError";
import {loadAllScores} from "../repository/scoringRepository"

export const CREATE_SCORING = 'CREATE_SCORING';
export const UPDATE_SCORING = 'UPDATE_SCORING';
export const DELETE_SCORING = 'DELETE_SCORING';
export const LOAD_SCORES_FROM_DB = "LOAD_SCORES_FROM_DB"

export const loadScoresFromDb = () => {

    return async dispatch => {

        const allScores = await loadAllScores()
            .catch((error) =>
                errorActions.newError(new CustomError(error.message + "", JSON.stringify(error, Object.getOwnPropertyNames(error))))
            )

        const loadedScores = Array<Scoring>()
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

            loadedScores.push(savedScoring)
        })


        dispatch({type: LOAD_SCORES_FROM_DB, loadedScores: loadedScores})

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
