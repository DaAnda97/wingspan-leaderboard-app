import React, {useCallback, useEffect, useState} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Dialog, Divider, IconButton, Paragraph, Portal, Text} from 'react-native-paper';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';
import { RootState } from '../../stores/main/RootReducer';
import Scoring from '../../models/scoring/scoring';
import NameRow from './items/NameRow';
import ScoringColumn from "./items/ScoringColumn";
import * as scoringActions from "../../stores/scoring/scoringActions";
import * as gameSheetActions from "../../stores/gameSheet/gameSheetActions";
import PointCategoryContainer from "./items/PointCategoryColumn";


const ScoringOverview = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const scores = useSelector((state: RootState) => state.scores.savedScores).filter((score : Scoring) => score.gameSheetId === route.params.gameSheetId)
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false)

    // Button in Navigation
    const deleteHandler = useCallback(() => {
        try {
            dispatch(gameSheetActions.deleteGameSheet(route.params.gameSheetId));
            scores.forEach((scoring) => {
                dispatch(scoringActions.deleteScoring(scoring.id));
            })
        } catch (err) {
            throw new Error(err);
        }

        navigation.goBack()
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={'delete'}
                    color={Colors.cation}
                    size={23}
                    onPress={() => setIsDeleteDialogShown(true)}
                />
            )
        });
    }, []);



    return (
        <View style={styles.main}>
            <NameRow scores={scores} />

            <Divider />

            <View>
                <View style={styles.scrollView}>
                    <View style={styles.categoryContainer}>
                        <PointCategoryContainer />
                    </View>

                    {scores.map((scoring: Scoring) => {
                        return (
                            <ScoringColumn
                                key={scoring.id}
                                scoring={scoring}
                            />
                        );
                    })}
                </View>
            </View>

            <Portal>
                <Dialog
                    visible={isDeleteDialogShown}
                    onDismiss={() => setIsDeleteDialogShown(false)}
                >
                    <Dialog.Title>{i18n.translate("warning")}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            {i18n.translate("really_delete_game")}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDeleteDialogShown(false)}>
                            {i18n.translate("cancel")}
                        </Button>
                        <Button
                            color={Colors.cation}
                            onPress={() => {
                                setIsDeleteDialogShown(false)
                                deleteHandler()
                            }}>
                            {i18n.translate("confirm")}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.inactive,
        padding: 10,
        marginBottom: 5
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row'
    },
    categoryContainer: {
        width: 95,
        alignItems: 'flex-start'
    },
    score: {
        minHeight: 50,
        height: Dimensions.get('screen').height / 11,
        alignItems: "center",
        justifyContent: 'center',
    },
    textStyle: {
        margin: 5,
    }
});

export const screenOptions = () => {
    return {
        headerTitle: i18n.translate("game_overview")
    };
};

export default ScoringOverview;
