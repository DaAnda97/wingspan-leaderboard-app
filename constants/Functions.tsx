const helpers = {
    isNumber: function (input: string) {
        return !isNaN(parseInt(input));
    },
    throwError: function (errorMessage: string) {
        throw new Error(errorMessage);
    }
};

export default helpers;
