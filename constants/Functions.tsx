const helpers = {
    isNumber: function (input: string) {
        return !isNaN(Number(input))
    },
    throwError: function(errorMessage: string) {
        throw new Error(errorMessage);
    }
}

export default helpers