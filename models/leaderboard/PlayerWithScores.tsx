class PlayerWithScores {
    constructor(
        public id: string,
        public name: string,
        public totalGames: number,
        public pacificGames: number,
        public avgRoundPoints: number,
        public avgBonusPoints: number,
        public avgEggPoints: number,
        public avgFoodPoints: number,
        public avgNectarPoints: number,
        public avgBirdPoints: number,
        public avgCardPoints: number,
        public avgTotalScore: number,
    ) {}
}

export default PlayerWithScores;
