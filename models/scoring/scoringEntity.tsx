import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class ScoringEntity extends BaseModel {
    constructor(obj) {
        super(obj);
    }

    static get database() {
        return async () => SQLite.openDatabase('wingspan.db');
    }

    static get tableName() {
        return 'scores';
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            gameSheetId: { type: types.TEXT, not_null: true },
            playerId: { type: types.TEXT, not_null: true },
            roundPoints: { type: types.Integer, not_null: true },
            bonusPoints: { type: types.Integer, not_null: true },
            eggPoints: { type: types.Integer, not_null: true },
            foodPoints: { type: types.Integer, not_null: true },
            nectarPoints: { type: types.Integer, not_null: true },
            birdPoints: { type: types.Integer, not_null: true },
            cardPoints: { type: types.Integer, not_null: true },
            totalScore: { type: types.Integer, not_null: true }
        };
    }
}
