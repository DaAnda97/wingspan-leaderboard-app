import DatabaseLayer from "expo-sqlite-orm/src/DatabaseLayer";
import * as SQLite from "expo-sqlite";
import PlayerEntity from "../models/player/playerEntity";

export const createPlayersTable = () => {
    PlayerEntity.createTable()
    console.log("Table players created successfully")
    //PlayerEntity.dropTable()
}

export async function createPlayer(name) {
    const playerEntity = new PlayerEntity({name: name, isActive: 1})
    return playerEntity.save();
}

export const loadAllPlayers = () => {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'))
    return databaseLayer.executeSql('SELECT * from players;')
}