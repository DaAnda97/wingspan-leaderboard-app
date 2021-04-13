export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';


export const createPlayer = () => {
    return {
        type: CREATE_PLAYER,
        playerData: {
        }
    };
};

export const updatePlayer = (id: string) => {
    return {
        type: UPDATE_PLAYER,
        id: id,
        playerData: {
        }
    };
};

export const deletePlayer = playerId => {
    return {
        type: DELETE_PLAYER,
        did: playerId
    };
};