import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

import ScoringSheetEntity from "../model/scoringSheetEntity";
import ScoringEntity from "../model/scoringEntity";

export const createScoringSheetTable = () => {
    ScoringSheetEntity.createTable()
}

export const createScoresTable = () => {
    ScoringEntity.createTable()
}

export const saveScores = (scores) => {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'), 'scores');
    const scoringSheet = new ScoringSheetEntity({})

    scoringSheet.save().then(

        scoringSheetResponse => {
            let allScoresToSave = []

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

            databaseLayer.bulkInsertOrReplace(allScoresToSave).then(response => {
                console.log(response)
            })
        }
    )

}