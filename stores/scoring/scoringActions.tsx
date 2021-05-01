import Scoring from '../../models/scoring/scoring';
import {ERROR} from "../main/errorAction";
import CustomError from "../../models/main/customError";
import * as scoringRepositoryActions from '../../repositories/scoringRepository';

export const CREATE_SCORING = 'CREATE_SCORING';
export const UPDATE_SCORING = 'UPDATE_SCORING';
export const REMOVE_SCORING = 'REMOVE_SCORING';
export const DELETE_SCORING = 'DELETE_SCORING';
export const PERSIST_SCORES = 'PERSIST_SCORES';
export const LOAD_SCORES_FROM_DB = "LOAD_SCORES_FROM_DB";


export const loadScoresFromDb = () => {
    return async (dispatch) => {
        const loadedScores = await scoringRepositoryActions
            .loadAllScores()
            .catch((error) =>
                dispatch({
                    ERROR,
                    error: new CustomError(
                        error.message + '',
                        JSON.stringify(error, Object.getOwnPropertyNames(error))
                    )
                })
            );

        const savedScores = Array<Scoring>();
        loadedScores.rows.forEach((scoringEntity) => {

            const savedScore = new Scoring(
                "" + scoringEntity.id,
                "" + parseInt(scoringEntity.gameSheetId),
                "" + parseInt(scoringEntity.playerId),
                scoringEntity.isPacific === "true",
                parseInt(scoringEntity.roundPoints),
                parseInt(scoringEntity.bonusPoints),
                parseInt(scoringEntity.eggPoints),
                parseInt(scoringEntity.foodPoints),
                parseInt(scoringEntity.nectarPoints),
                parseInt(scoringEntity.birdPoints),
                parseInt(scoringEntity.cardPoints),
                parseInt(scoringEntity.totalScore),
                true
            );
            savedScores.push(savedScore);
        });

        dispatch({type: LOAD_SCORES_FROM_DB, loadedScores: savedScores});
    };
};

export const deleteScoring = (scoringId: string) => {
    return async (dispatch) => {
        await scoringRepositoryActions.deleteScoring(scoringId)

        dispatch({type: DELETE_SCORING, scoringId: scoringId});
    };
};


export const saveScores = (scores: Array<Scoring>) => {
    return async (dispatch) => {
        const allScores = await scoringRepositoryActions.saveScoringArray(scores);

        const loadedScores = Array<Scoring>();
        allScores.rows.forEach((scoring) => {
            const savedScoring = new Scoring(
                "" + scoring.id,
                "" + parseInt(scoring.gameSheetId),
                "" + parseInt(scoring.playerId),
                scoring.isPacific === "true",
                parseInt(scoring.roundPoints),
                parseInt(scoring.bonusPoints),
                parseInt(scoring.eggPoints),
                parseInt(scoring.foodPoints),
                parseInt(scoring.nectarPoints),
                parseInt(scoring.birdPoints),
                parseInt(scoring.cardPoints),
                parseInt(scoring.totalScore),
                true
            );

            loadedScores.push(savedScoring);
        });

        dispatch({type: PERSIST_SCORES, loadedScores: loadedScores});
    };
};

export const createScoring = (gameSheetId: string, playerId: string, isPacific: boolean) => {
    return {
        type: CREATE_SCORING,
        id: "tmp_unsaved_" + gameSheetId + "_" + playerId,
        scoringData: {
            gameSheetId,
            playerId,
            isPacific
        }
    };
};

export const updateScoring = (id: string, gameSheetId: string, playerId: string, isPacific: boolean, roundPoints: number, bonusPoints: number, eggPoints: number,
                              foodPoints: number, nectarPoints: number, birdsPoints: number, cardPoints: number, isValid: boolean) => {
    return {
        type: UPDATE_SCORING,
        id: id,
        scoringData: {
            gameSheetId,
            playerId,
            roundPoints,
            isPacific,
            bonusPoints,
            eggPoints,
            foodPoints,
            nectarPoints,
            birdsPoints,
            cardPoints,
            isValid
        }
    };
};

export const removeScoring = (scoringId: string) => {
    return {
        type: REMOVE_SCORING,
        scoringId: scoringId
    };
};
