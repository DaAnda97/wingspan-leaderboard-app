import ScoringField from "./scoringField";

class ScoringPlayerInput {
    constructor(
        public playerId: string,
        public fields:  Array<ScoringField>
    ) {
    }
}

export default ScoringPlayerInput