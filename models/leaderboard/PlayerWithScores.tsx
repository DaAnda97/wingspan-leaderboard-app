import Points from "./Points";

class PlayerWithScores {
    id: string;
    name: string;
    totalGames: number;
    pacificGames: number;
    roundPoints: Points;
    bonusPoints: Points;
    eggPoints: Points;
    foodPoints: Points;
    nectarPoints: Points;
    birdPoints: Points;
    cardPoints: Points;
    totalScore: Points;

    constructor(id: string, name: string, totalGames: number, pacificGames: number, roundPoints: Points,
                bonusPoints: Points, eggPoints: Points, foodPoints: Points, nectarPoints: Points, birdPoints: Points,
                cardPoints: Points, totalScore: Points) {
        this.id = id;
        this.name = name;
        this.totalGames = totalGames;
        this.pacificGames = pacificGames;
        this.roundPoints = roundPoints;
        this.bonusPoints = bonusPoints;
        this.eggPoints = eggPoints;
        this.foodPoints = foodPoints;
        this.nectarPoints = nectarPoints;
        this.birdPoints = birdPoints;
        this.cardPoints = cardPoints;
        this.totalScore = totalScore;
    }

    get(attributeName: string): Points {
        switch (attributeName) {
            case "roundPoints":
                return this.totalScore;
            case "bonusPoints":
                return this.bonusPoints;
            case "eggPoints":
                return this.eggPoints;
            case "foodPoints":
                return this.foodPoints;
            case "nectarPoints":
                return this.nectarPoints;
            case "birdPoints":
                return this.birdPoints;
            case "cardPoints":
                return this.cardPoints;
            case "totalScore":
                return this.totalScore;
        }
        return this.totalScore;
    }
}

export default PlayerWithScores;
