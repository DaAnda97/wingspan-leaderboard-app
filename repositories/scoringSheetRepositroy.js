import ScoringSheetEntity from "../components/scoringSheet/scoringSheetEntity";
import DatabaseLayer from "expo-sqlite-orm/src/DatabaseLayer";
import * as SQLite from "expo-sqlite";

export const createScoringSheetsTable = () => {
    ScoringSheetEntity.createTable()
    console.log("Table scoringSheets created successfully")
    //ScoringSheetEntity.dropTable()
}

export async function saveNewScoringSheet() {
    const scoringSheet = new ScoringSheetEntity({})
    return scoringSheet.save();
}

export const loadAllScores = () => {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'))
    return databaseLayer.executeSql('SELECT * from scoringSheets;')
}