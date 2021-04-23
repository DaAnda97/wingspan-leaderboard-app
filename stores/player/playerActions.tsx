import CustomError from '../../models/main/customError';
import * as playerRepositoryActions from '../../repositories/playerRepository';
import Player from '../../models/player/player';
import { ERROR } from '../main/errorAction';

export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const LOAD_PLAYERS_FROM_DB = 'LOAD_PLAYERS_FROM_DB';

export const createPlayer = (name: string) => {
    return async (dispatch) => {
        const playerEntity = await playerRepositoryActions
            .createPlayer(name)
            .catch((error) =>
                dispatch({
                    ERROR,
                    error: new CustomError(
                        error.message + '',
                        JSON.stringify(error, Object.getOwnPropertyNames(error))
                    )
                })
            );

        dispatch({
            type: CREATE_PLAYER,
            playerId: "" + playerEntity.id,
            playerData: {
                name: playerEntity.name,
                isActive: playerEntity.isActive === 1
            }
        });
    };
};

export const updatePlayer = (player: Player) => {
    return async (dispatch) => {
        const playerEntity = await playerRepositoryActions
            .updatePlayer(player)
            .catch((error) =>
                dispatch({
                    ERROR,
                    error: new CustomError(
                        error.message + '',
                        JSON.stringify(error, Object.getOwnPropertyNames(error))
                    )
                })
            );

        dispatch({
            type: UPDATE_PLAYER,
            playerId: "" + playerEntity.id,
            playerData: {
                name: playerEntity.name,
                isActive: playerEntity.isActive === 1
            }
        });
    };
};

export const deletePlayer = (playerId) => {
    return {
        type: DELETE_PLAYER,
        id: playerId
    };
};

export const loadPlayersFromDb = () => {
    return async (dispatch) => {
        const loadedPlayers = await playerRepositoryActions
            .loadAllPlayers()
            .catch((error) =>
                dispatch({
                    ERROR,
                    error: new CustomError(
                        error.message + '',
                        JSON.stringify(error, Object.getOwnPropertyNames(error))
                    )
                })
            );

        const savedPlayers = Array<Player>();
        loadedPlayers.rows.forEach((playerEntity) => {
            const savedPlayer = new Player(
                "" + playerEntity.id,
                playerEntity.name,
                playerEntity.isActive == 1
            );
            savedPlayers.push(savedPlayer);
        });

        dispatch({ type: LOAD_PLAYERS_FROM_DB, loadedPlayers: savedPlayers });
    };
};