import Player from '../../models/player/player';
import {
    CREATE_PLAYER,
    LOAD_PLAYERS_FROM_DB,
    UPDATE_PLAYER
} from './playerActions';

const initialState = {
    allPlayers: Array<Player>()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PLAYER:
            const savedPlayer = new Player(action.playerId, action.playerData.name, action.player.isActive)

            return {
                ...state,
                allPlayers: [...state.allPlayers, savedPlayer]
            };

        case UPDATE_PLAYER:
            const updatedPlayer = new Player(action.playerId, action.playerData.name, action.player.isActive)

            const selectedIndex = state.allPlayers.findIndex(
                (player) => player.id === action.player.id
            );

            const updatedPlayers = [...state.allPlayers];
            updatedPlayers[selectedIndex] = updatedPlayer;

            return {
                ...state,
                allPlayers: updatedPlayers
            };

        case LOAD_PLAYERS_FROM_DB:
            return {
                ...state,
                allPlayers: action.loadedPlayers
            };
    }

    //default
    return state;
};
