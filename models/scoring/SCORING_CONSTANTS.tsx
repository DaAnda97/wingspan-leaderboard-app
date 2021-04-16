import ScoringField from "./scoringField";
import ScoringFieldName from "./scoringFieldName";
import React from "react";
import {TextInput as RNTextInput} from "react-native";

export const SCORING_FIELD_NAMES : Array<ScoringFieldName> = [
    new ScoringFieldName("round", "Rundenzeile"),
    new ScoringFieldName("bonus", "Bonuskarten"),
    new ScoringFieldName("egg", "Eier auf Vögeln"),
    new ScoringFieldName("food", "gelagertes Futter"),
    new ScoringFieldName("nectar", "erspielter Nektar"),
    new ScoringFieldName("bird", "Vogelpunkte"),
    new ScoringFieldName("card", "Karten unter Vögeln")
];

export const INITIAL_SCORING_FIELDS : Array<ScoringField> = [
    new ScoringField(
        "round",
        "0",
        0,
        true
    ),
    new ScoringField(
        "bonus",
        "0",
        0,
        true
    ),
    new ScoringField(
        "egg",
        "0",
        0,
        true
    ),
    new ScoringField(
        "food",
        "0",
        0,
        true
    ),
    new ScoringField(
        "nectar",
        "0",
        0,
        true
    ),
    new ScoringField(
        "bird",
        "0",
        0,
        true
    ),
    new ScoringField(
        "card",
        "0",
        0,
        true
    ),
];

export const INPUT_REFS = [
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
    ],
]