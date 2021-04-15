import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

import ScoringSheetEntity from "../../leaderboard/model/scoringSheetEntity";
import ScoringEntity from "../model/scoringEntity";
import CustomError from "../../main/model/customError";
import * as errorActions from "../../main/store/errorAction";
import {loadScoresFromDb} from "../store/scoringActions";
import * as scoringSheetActions from "../../leaderboard/store/scoringSheetActions";


export const createScoringSheetTable = () => {
    ScoringSheetEntity.createTable()
}
export const createScoresTable = () => {
    ScoringEntity.createTable()
}

export const saveScores = (scores) => {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'), 'scores');
    const scoringSheet = new ScoringSheetEntity({})

    const scoringSheetResponse = scoringSheet.save()
        .then((scoringSheetResponse) => {
            const allScoresToSave = []
            scores.forEach(score => {
                const scoringToSave = {
                    scoringSheetId: scoringSheetResponse.id,
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

            databaseLayer.bulkInsertOrReplace(allScoresToSave)
                .then(() => {
                    loadScoresFromDb()
                    //loadAllScores().then(r => console.log(r))
                    //dispatch({type: LOAD_SCORE_SHEETS_FROM_DB})
                })
                .catch((error) => {
                    errorActions.newError(new CustomError(error.message + "", JSON.stringify(error, Object.getOwnPropertyNames(error))))
                })
        })
        .catch((error) => {
            errorActions.newError(new CustomError(error.message + "", JSON.stringify(error, Object.getOwnPropertyNames(error))))
        })
}

export const loadAllScores = () => {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'))
    return databaseLayer.executeSql('SELECT * from scores;')
}