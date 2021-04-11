import ScoringField from "./scoringField";

export const SCORING_INPUT_KEYS : Array<string> = ["round", "bonus", "egg", "food", "nectar", "bird", "card"]

export const INITIAL_SCORING_FIELDS : Array<ScoringField> = [
    new ScoringField(
        "round",
        "0",
        true
    ),
    new ScoringField(
        "bonus",
        "0",
        true
    ),
    new ScoringField(
        "egg",
        "0",
        true
    ),
    new ScoringField(
        "food",
        "0",
        true
    ),
    new ScoringField(
        "nectar",
        "0",
        true
    ),
    new ScoringField(
        "bird",
        "0",
        true
    ),
    new ScoringField(
        "card",
        "0",
        true
    ),
]