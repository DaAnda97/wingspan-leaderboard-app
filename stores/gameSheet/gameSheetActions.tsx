import {ERROR} from "../main/errorAction";
import GameSheet from "../../models/gameSheet/gameSheet"
import CustomError from "../../models/main/customError";
import * as gameSheetRepositoryActions from '../../repositories/gameSheetRepository';

export const LOAD_GAME_SHEETS_FROM_DB = "LOAD_GAME_SHEETS_FROM_DB";


export const loadGameSheetsFromDb = () => {
    return async (dispatch) => {
        const loadedGameSheets = await gameSheetRepositoryActions.loadAllGameSheets()
            .catch((error) =>
                dispatch({
                    ERROR,
                    error: new CustomError(
                        error.message + '',
                        JSON.stringify(error, Object.getOwnPropertyNames(error))
                    )
                })
            );

        let savedGameSheets = Array<GameSheet>();
        loadedGameSheets.rows.forEach((gameSheetEntity) => {
            const savedGameSheet = new GameSheet(
                gameSheetEntity.id + "",
                new Date(gameSheetEntity.timestamp)
            );
            savedGameSheets.push(savedGameSheet);
        });

        const loadedSavedGameSheets = savedGameSheets.sort((a: GameSheet, b: GameSheet) => {return b.timestamp.valueOf() - a.timestamp.valueOf() })

        dispatch({ type: LOAD_GAME_SHEETS_FROM_DB, loadedGameSheets: loadedSavedGameSheets });
    };
};
