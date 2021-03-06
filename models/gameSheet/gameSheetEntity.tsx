import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class GameSheetEntity extends BaseModel {
    constructor(obj) {
        super(obj);
    }

    static get database() {
        return async () => SQLite.openDatabase('wingspan.db');
    }

    static get tableName() {
        return 'gameSheets';
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            timestamp: { type: types.INTEGER, default: () => Date.now() }
        };
    }
}
