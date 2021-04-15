import * as SQLite from 'expo-sqlite'
import {SQLiteCallback} from "expo-sqlite";
import Scoring from "../domains/scoring/model/scoring";

const db = SQLite.openDatabase("wingspan.db")

export const initDBs = () => {
    initScoresDB()
        .then( () => console.log("Scores Database initialized successfully"))
        .catch( (error: Error) => console.log(`Scores Database initialisation failed with error: ${error}`))

    initPlayersDB()
        .then( () => console.log("Players Database initialized successfully"))
        .catch( (error: Error) => console.log(`Players Database initialisation failed with error: ${error}`))
}


export const insertScoring = (scoring: Scoring) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO scores (scoringSheetId, playerId, roundPoints, bonusPoints, eggPoints, foodPoints, nectarPoints, birdPoints, cardPoints, totalScore) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [scoring.scoringSheetId, scoring.playerId, scoring.roundPoints, scoring.bonusPoints, scoring.eggPoints, scoring.foodPoints, scoring.nectarPoints, scoring.birdPoints, scoring.cardPoints, scoring.totalScore],
                (_, result) => {
                    resolve(result)
                },
                (_, err): boolean  => {
                    reject(err)
                    return true; //Todo: What's this shit?
                }
            )
        })
    })
}

export const drop = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("DROP TABLE scores; DROP TABLE players",
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, err): boolean  => {
                    reject(err)
                    return true; //Todo: What's this shit?
                }
            )
        })
    })
}






const initScoresDB = () => {

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY NOT NULL, scoringSheetId TEXT NOT NULL, playerId TEXT NOT NULL, roundPoints INTEGER NOT NULL, bonusPoints INTEGER NOT NULL, eggPoints INTEGER NOT NULL, foodPoints INTEGER NOT NULL, nectarPoints INTEGER NOT NULL, birdPoints INTEGER NOT NULL, cardPoints INTEGER NOT NULL, totalScore INTEGER NOT NULL );",
                [],
                () => {
                    resolve()
                },
                (_, err): boolean  => {
                    reject(err)
                    return true; //Todo: What's this shit?
                }
            )
        })
    })

}

const initPlayersDB = () => {

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);",
                [],
                () => {
                    resolve()
                },
                (_, err): boolean  => {
                    reject(err)
                    return true; //Todo: What's this shit?
                }
            )
        })
    })

}