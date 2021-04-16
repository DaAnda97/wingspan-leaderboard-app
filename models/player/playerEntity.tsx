import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class PlayerEntity extends BaseModel {
    constructor(obj) {
        super(obj)
    }

    static get database() {
        return async () => SQLite.openDatabase('wingspan.db')
    }

    static get tableName() {
        return 'players'
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            name: { type: types.TEXT, not_null: true },
            isActive: { type: types.INTEGER, not_null: true },
        }
    }
}