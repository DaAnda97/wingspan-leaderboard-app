import Scoring from '../../models/scoring/scoring';
import { saveScoringArray } from '../../repositories/scoringRepository';

export const CREATE_SCORING = 'CREATE_SCORING';
export const UPDATE_SCORING = 'UPDATE_SCORING';
export const DELETE_SCORING = 'DELETE_SCORING';
export const PERSIST_SCORES = 'PERSIST_SCORES';

export const saveScores = (scores: Array<Scoring>) => {
    return async (dispatch) => {
        const allScores = await saveScoringArray(scores);

        const loadedScores = Array<Scoring>();
        allScores.rows.forEach((scoring) => {
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
            );

            loadedScores.push(savedScoring);
        });

        dispatch({ type: PERSIST_SCORES, loadedScores: loadedScores });
    };
};

export const createScoring = (scoringSheetId: string, playerId: string) => {
    return {
        type: CREATE_SCORING,
        id: "tmp_unsaved_" + scoringSheetId + "_" + playerId,
        scoringData: {
            scoringSheetId,
            playerId
        }
    };
};

export const updateScoring = (
    id: string,
    scoringSheetId: string,
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
        id: scoringId
    };
};
