import Player from '../../models/player/player';
import PLAYERS from '../../data/players';
import {
    CREATE_PLAYER,
    DELETE_PLAYER,
    LOAD_PLAYERS_FROM_DB,
    UPDATE_PLAYER
} from './playerActions';
import helpers from '../../constants/Functions';

const initialState = {
    allPlayers: Array<Player>()
    //allPlayers: PLAYERS
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PLAYER:
            return {
                ...state,
                allPlayers: [...state.allPlayers, action.player]
            };

        case UPDATE_PLAYER:
            const selectedIndex = state.allPlayers.findIndex(
                (player) => player.id === action.player.id
            );

            const updatedPlayers = [...state.allPlayers];
            updatedPlayers[selectedIndex] = action.player;

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
