export const CREATE_SCORING = 'CREATE_SCORING';
export const UPDATE_SCORING = 'UPDATE_SCORING';
export const DELETE_SCORING = 'DELETE_SCORING';


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
