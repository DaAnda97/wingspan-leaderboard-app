import CustomError from "../../models/main/customError";
import * as playerRepositoryActions from "../../repositories/playerRepository"
import Player from "../../models/player/player";
import {ERROR} from "../main/errorAction";

export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const LOAD_PLAYERS_FROM_DB = "LOAD_PLAYERS_FROM_DB"


export const createPlayer = (name: string) => {
    return async dispatch => {

        const savingResult = await playerRepositoryActions.createPlayer(name)
            .catch((error) =>
                dispatch({ERROR, error: new CustomError(error.message + "", JSON.stringify(error, Object.getOwnPropertyNames(error)))})
            )

        dispatch({type: CREATE_PLAYER, player: new Player(savingResult.id, name, true)})

    }
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

export const loadPlayersFromDb = () => {
    return async dispatch => {

        const loadedPlayers = await playerRepositoryActions.loadAllPlayers()
            .catch((error) =>
                dispatch({ERROR, error: new CustomError(error.message + "", JSON.stringify(error, Object.getOwnPropertyNames(error)))})
            )

        const savedPlayers = Array<Player>()
        loadedPlayers.rows.forEach( player => {
            const savedPlayer = new Player(
                player.id,
                player.name,
                player.isActive == 1
            )
            savedPlayers.push(savedPlayer)
        })

        console.log(savedPlayers)

        dispatch({type: LOAD_PLAYERS_FROM_DB, loadedPlayers: savedPlayers})

    }
}