import Scoring from '../../models/scoring/scoring';
import { saveScoringArray } from '../../repositories/scoringRepository';
import {ERROR} from "../main/errorAction";
import CustomError from "../../models/main/customError";
import * as scoringRepositoryActions from '../../repositories/scoringRepository';

export const CREATE_SCORING = 'CREATE_SCORING';
export const UPDATE_SCORING = 'UPDATE_SCORING';
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
                scoringEntity.id,
                scoringEntity.gameSheetId,
                scoringEntity.playerId,
                scoringEntity.roundPoints,
                scoringEntity.bonusPoints,
                scoringEntity.eggPoints,
                scoringEntity.foodPoints,
                scoringEntity.nectarPoints,
                scoringEntity.birdPoints,
                scoringEntity.cardPoints,
                scoringEntity.totalScore
            );
            savedScores.push(savedScore);
        });

        dispatch({ type: LOAD_SCORES_FROM_DB, loadedScores: savedScores });
    };
};


export const saveScores = (scores: Array<Scoring>) => {
    return async (dispatch) => {
        const allScores = await saveScoringArray(scores);

        const loadedScores = Array<Scoring>();
        allScores.rows.forEach((scoring) => {
            const savedScoring = new Scoring(
                scoring.id,
                scoring.gameSheetId,
                scoring.playerId,
                scoring.roundPoints,
                scoring.bonusPoints,
                scoring.eggPoints,
                scoring.foodPoints,
                scoring.nectarPoints,
                scoring.birdPoints,
                scoring.cardPoints,
                scoring.totalScore
            );

            loadedScores.push(savedScoring);
        });

        dispatch({ type: PERSIST_SCORES, loadedScores: loadedScores });
    };
};

export const createScoring = (gameSheetId: string, playerId: string) => {
    return {
        type: CREATE_SCORING,
        id: "tmp_unsaved_" + gameSheetId + "_" + playerId,
        scoringData: {
            gameSheetId,
            playerId
        }
    };
};

export const updateScoring = (
    id: string,
    gameSheetId: string,
    playerId: string,
    roundPoints: number,
    bonusPoints: number,
    eggPoints: number,
    foodPoints: number,
    nectarPoints: number,
    birdsPoints: number,
    cardPoints: number
) => {
    return {
        type: UPDATE_SCORING,
        id: id,
        scoringData: {
            gameSheetId,
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
        id: scoringId
    };
};
