import Scoring from "../model/scoring";
import SCORES from "../../../data/scores";

const initialState = {
    //allScores: Array<Scoring>()
    allScores: SCORES
}


export default (state = initialState, action) => {
    switch (action.type) {

    }

    //default
    return state;
};