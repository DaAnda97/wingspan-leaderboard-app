import Player from "../model/player";
import PLAYERS from "../../../data/players";
import {CREATE_PLAYER, DELETE_PLAYER, UPDATE_PLAYER} from "./playerActions";

const initialState = {
    //allPlayer: Array<Player>()
    allPlayers: PLAYERS
}


export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_PLAYER:
            const newPlayer: Player = new Player(
                Math.random().toString(36).substring(2),
                action.name
            )

            return {
                ...state,
                allPlayers: [...state.allPlayers, newPlayer]
            };


        case UPDATE_PLAYER:
            const selectedIndex = state.allPlayers.findIndex(player => player.id === action.id)

            const updatedPlayer: Player = new Player(
                action.id,
                action.newName
            );

            const updatedPlayers = [...state.allPlayers]
            updatedPlayers[selectedIndex] = updatedPlayer

            return {
                ...state,
                allPlayers: updatedPlayers
            }


        case DELETE_PLAYER:
            return {
                ...state,
                allPlayers: state.allPlayers.filter(
                    player => player.id !== action.id
                )
            };
    }

    //default
    return state;
};