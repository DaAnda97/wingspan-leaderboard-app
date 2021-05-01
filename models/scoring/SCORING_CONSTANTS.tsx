import ScoringField from './scoringField';
import ScoringFieldName from './scoringFieldName';
import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

export const INITIAL_SCORING_FIELDS: Array<ScoringField> = [
    new ScoringField('round', '0', 0, true),
    new ScoringField('bonus', '0', 0, true),
    new ScoringField('egg', '0', 0, true),
    new ScoringField('food', '0', 0, true),
    new ScoringField('nectar', '0', 0, true),
    new ScoringField('bird', '0', 0, true),
    new ScoringField('card', '0', 0, true)
];

export const INPUT_REFS = [
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>()
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>()
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>()
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>()
    ],
    [
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>(),
        React.createRef<RNTextInput>()
    ]
];
