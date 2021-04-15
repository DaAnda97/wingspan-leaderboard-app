export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';


export const createPlayer = (name : string) => {
    return {
        type: CREATE_PLAYER,
        name: name
    };
};

export const updatePlayer = (playerId: string, newName: string) => {
    return {
        type: UPDATE_PLAYER,
        id: playerId,
        newName: newName
    };
};

export const deletePlayer = playerId => {
    return {
        type: DELETE_PLAYER,
        id: playerId
    };
};