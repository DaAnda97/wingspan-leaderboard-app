class CustomError {
    constructor(public errorMessage: string, public details: string) {}

    getUserError() {
        if (this.errorMessage === '502') {
            return 'TBD';
        }
    }
}

export default CustomError;
