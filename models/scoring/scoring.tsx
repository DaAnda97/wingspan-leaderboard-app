class Scoring {
    constructor(
        public id: string,
        public gameSheetId: string,
        public playerId: string,
        public roundPoints: number,
        public bonusPoints: number,
        public eggPoints: number,
        public foodPoints: number,
        public nectarPoints: number,
        public birdPoints: number,
        public cardPoints: number,
        public totalScore: number,
        public isValid: boolean
    ) {}
}

export default Scoring;
