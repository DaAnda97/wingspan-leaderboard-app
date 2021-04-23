import GameSheetEntity from '../models/gameSheet/gameSheetEntity';
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer';
import * as SQLite from 'expo-sqlite';

export const dropGameSheetsTable = () => {
    GameSheetEntity.dropTable()
    console.log('Table scoringSheets dropped successfully');
};

export const createGameSheetsTable = () => {
    GameSheetEntity.createTable();
    console.log('Table scoringSheets created successfully');
};

export async function saveNewGameSheet() {
    const gameSheet = new GameSheetEntity({});
    return gameSheet.save();
}

export const loadAllGameSheets = () => {
    const databaseLayer = new DatabaseLayer(async () =>
        SQLite.openDatabase('wingspan.db')
    );
    return databaseLayer.executeSql('SELECT * from gameSheets;');
};

export async function deleteGameSheet(gameSheetId) {
    return GameSheetEntity.destroy(gameSheetId);
}
