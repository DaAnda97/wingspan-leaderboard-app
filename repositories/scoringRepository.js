import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

import ScoringEntity from "../models/scoring/scoringEntity";
import CustomError from "../models/main/customError";
import * as errorActions from "../stores/main/errorAction";
import {saveNewScoringSheet} from "./scoringSheetRepositroy";

export const createScoresTable = () => {
    ScoringEntity.createTable()
    console.log("Table scores created successfully")
    //ScoringEntity.dropTable()
}

export async function saveScoringArray(scores){
    const scoringSheetEntity = saveNewScoringSheet()

    const allScoresToSave = []
    scores.forEach(score => {
        const scoringToSave = {
            scoringSheetId: scoringSheetEntity.id,
            playerId: score.playerId,
            roundPoints: score.roundPoints,
            bonusPoints: score.bonusPoints,
            eggPoints: score.eggPoints,
            foodPoints: score.foodPoints,
            nectarPoints: score.nectarPoints,
            birdPoints: score.birdPoints,
            cardPoints: score.cardPoints,
            totalScore: score.totalScore,
        }

        allScoresToSave.push(scoringToSave)
    })

    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'), 'scores')
    await databaseLayer.bulkInsertOrReplace(allScoresToSave)

    return loadAllScores()
}


export const loadAllScores = () => {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'))
    return databaseLayer.executeSql('SELECT * from scores;')
}