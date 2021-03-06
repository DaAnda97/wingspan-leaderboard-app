import * as SQLite from 'expo-sqlite';
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer';

import ScoringEntity from '../models/scoring/scoringEntity';
import { saveNewGameSheet } from './gameSheetRepository';

export const dropScoresTable = () => {
    ScoringEntity.dropTable();
    console.log('Table scores dropped successfully');
};

export const createScoresTable = () => {
    ScoringEntity.createTable();
    console.log('Table scores created successfully');
};

export async function saveScoringArray(scores) {
    const gameSheetEntity = await saveNewGameSheet();
    const allScoresToSave = [];
    scores.forEach((score) => {
        const scoringToSave = {
            gameSheetId: gameSheetEntity.id,
            playerId: score.playerId,
            roundPoints: score.roundPoints,
            isPacific: Boolean(score.isPacific).toString(),
            bonusPoints: score.bonusPoints,
            eggPoints: score.eggPoints,
            foodPoints: score.foodPoints,
            nectarPoints: score.nectarPoints,
            birdPoints: score.birdPoints,
            cardPoints: score.cardPoints,
            totalScore: score.totalScore
        };

        allScoresToSave.push(scoringToSave);
    });

    const databaseLayer = new DatabaseLayer(
        async () => SQLite.openDatabase('wingspan.db'),
        'scores'
    );
    await databaseLayer.bulkInsertOrReplace(allScoresToSave);

    return loadAllScores();
}

export const loadAllScores = () => {
    const databaseLayer = new DatabaseLayer(async () =>
        SQLite.openDatabase('wingspan.db')
    );
    return databaseLayer.executeSql('SELECT * from scores;');
};

export async function deleteScoring(scoringId) {
    return ScoringEntity.destroy(scoringId);
}
