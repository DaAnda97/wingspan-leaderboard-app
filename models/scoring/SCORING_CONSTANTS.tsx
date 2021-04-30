import ScoringField from './scoringField';
import ScoringFieldName from './scoringFieldName';
import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import i18n from 'i18n-js';

export const SCORING_FIELD_NAMES: Array<ScoringFieldName> = [
    new ScoringFieldName('round', i18n.translate('end_of_round_goals')),
    new ScoringFieldName('bonus', i18n.translate('bonus_cards')),
    new ScoringFieldName('egg', i18n.translate('eggs')),
    new ScoringFieldName('food', i18n.translate('food_on_cards')),
    new ScoringFieldName('nectar', i18n.translate('nectar')),
    new ScoringFieldName('bird', i18n.translate('birds')),
    new ScoringFieldName('card', i18n.translate('tucked_cards'))
];

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
