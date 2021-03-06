import CustomError from '../../models/main/customError';

export const ERROR = 'ERROR';
export const DELETE_ERRORS = 'DELETE_ERRORS';

export const newError = (error: CustomError) => {
    return {
        type: ERROR,
        error: error
    };
};

export const deleteAllErrors = () => {
    return {
        type: DELETE_ERRORS
    };
};
