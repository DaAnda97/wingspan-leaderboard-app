import Player from "../../models/player/player";
import PLAYERS from "../../data/players";
import {CREATE_PLAYER, DELETE_PLAYER, LOAD_PLAYERS_FROM_DB, UPDATE_PLAYER} from "./playerActions";
import helpers from "../../constants/Functions";

const initialState = {
    allPlayers: Array<Player>()
    //allPlayers: PLAYERS
}


export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_PLAYER:
            return {
                ...state,
                allPlayers: [...state.allPlayers, action.player]
            };


        case UPDATE_PLAYER:
            const selectedIndex = state.allPlayers.findIndex(player => player.id === action.id)

            const updatedPlayer: Player = new Player(
                action.id,
                action.newName,
                true
            );

            const updatedPlayers = [...state.allPlayers]
            updatedPlayers[selectedIndex] = updatedPlayer

            return {
                ...state,
                allPlayers: updatedPlayers
            }


        case DELETE_PLAYER:
            const deletingIndex = state.allPlayers.findIndex(player => player.id === action.id)
            const selectedPlayer = state.allPlayers.find(player => player.id === action.id)
                ?? helpers.throwError("Error in playerReducer: player id not found")

            const deletingPlayer: Player = new Player(
                selectedPlayer.id,
                selectedPlayer.name,
                false
            );

            const uPlayers = [...state.allPlayers]
            uPlayers[deletingIndex] = deletingPlayer

            return {
                ...state,
                allPlayers: uPlayers
            }


        case LOAD_PLAYERS_FROM_DB:
            return {
                ...state,
                allPlayers: action.loadedPlayers
            }

    }

    //default
    return state;
};