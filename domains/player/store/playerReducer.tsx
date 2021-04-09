import Player from "../model/player";
import PLAYERS from "../../../data/players";

const initialState = {
    //allPlayer: Array<Player>()
    allPlayer: PLAYERS
}


export default (state = initialState, action) => {
    switch (action.type) {

    }

    //default
    return state;
};