import { DELETE_ERRORS, ERROR } from './errorAction';
import CustomError from '../../models/main/customError';

const initialState = {
    allErrors: Array<CustomError>()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                allErrors: [action.error, ...state.allErrors]
            };

        case DELETE_ERRORS:
            return {
                ...state,
                allErrors: Array<CustomError>()
            };
    }

    //default
    return state;
};
