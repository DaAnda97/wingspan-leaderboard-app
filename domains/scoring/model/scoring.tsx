class Scoring {
    constructor(
        public id: string,
        public scoringSheetId: string,
        public playerId: string,
        public roundPoints: number,
        public bonusPoints: number,
        public eggPoints: number,
        public foodPoints: number,
        public nectarPoints: number,
        public birdsPoints: number,
        public cardPoints: number
    ) {
    }
}

export default Scoring