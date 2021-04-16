import DatabaseLayer from "expo-sqlite-orm/src/DatabaseLayer";
import * as SQLite from "expo-sqlite";
import PlayerEntity from "../models/player/playerEntity";
import * as errorActions from "../stores/main/errorAction";
import CustomError from "../models/main/customError";

export const createPlayersTable = () => {
    PlayerEntity.createTable()
    console.log("Table players created successfully")
    //PlayerEntity.dropTable()
}

export async function createPlayer(playerName) {
    const savedEntity = await PlayerEntity.create({name: playerName, isActive: 1})
    return PlayerEntity.find(savedEntity.id)
}

export async function updatePlayer(player){
    await PlayerEntity.update({id: player.id, name: player.name, isActive: player.isActive ? 1 : 0})
    return PlayerEntity.find(player.id)
}

export const loadAllPlayers = () => {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('wingspan.db'))
    return databaseLayer.executeSql('SELECT * from players;')
}