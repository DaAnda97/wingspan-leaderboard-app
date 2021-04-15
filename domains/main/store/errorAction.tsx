export const ERROR = 'ERROR'
export const DELETE_ERRORS = 'DELETE_ERRORS'

export const deleteAllErrors = () => {
    return {
        type: DELETE_ERRORS,
    };
};