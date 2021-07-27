class PlayerWithScores {
    id: string;
    name: string;
    totalGames: number;
    pacificGames: number;
    avgRoundPoints: number;
    avgBonusPoints: number;
    avgEggPoints: number;
    avgFoodPoints: number;
    avgNectarPoints: number;
    avgBirdPoints: number;
    avgCardPoints: number;
    avgTotalScore: number;

    constructor(id, name, totalGames, pacificGames, avgRoundPoints, avgBonusPoints, avgEggPoints, avgFoodPoints,
                avgNectarPoints, avgBirdPoints, avgCardPoints, avgTotalScore) {
        this.id = id;
        this.name = name;
        this.totalGames = totalGames;
        this.pacificGames = pacificGames;
        this.avgRoundPoints = avgRoundPoints;
        this.avgBonusPoints = avgBonusPoints;
        this.avgEggPoints = avgEggPoints;
        this.avgFoodPoints = avgFoodPoints;
        this.avgNectarPoints = avgNectarPoints;
        this.avgBirdPoints = avgBirdPoints;
        this.avgCardPoints = avgCardPoints;
        this.avgTotalScore = avgTotalScore;
    }

    get(attributeName: string): number {
        switch (attributeName) {
            case "avgRoundPoints":
                return this.avgTotalScore;
            case "avgBonusPoints":
                return this.avgBonusPoints;
            case "avgEggPoints":
                return this.avgEggPoints;
            case "avgFoodPoints":
                return this.avgFoodPoints;
            case "avgNectarPoints":
                return this.avgNectarPoints;
            case "avgBirdPoints":
                return this.avgBirdPoints;
            case "avgCardPoints":
                return this.avgCardPoints;
            case "avgTotalScore":
                return this.avgTotalScore;
        }
        return this.avgTotalScore;
    }
}

export default PlayerWithScores;
