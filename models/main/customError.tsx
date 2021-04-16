class CustomError {
    constructor(public errorMessage: string, public details: string) {}

    getUserError() {
        if (this.errorMessage === '502') {
            return 'Ups. Da ist etwas schief gelaufen. 🤭 \nWir beheben den Fehler so schnell wie möglich.';
        } else if (this.errorMessage === 'Network request failed') {
            return 'Der Service konnte nicht erreicht werden. Prüfe deine Internetverbindung und versuche es erneut.';
        }
    }
}

export default CustomError;
