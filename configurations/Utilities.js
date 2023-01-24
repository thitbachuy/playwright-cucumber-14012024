class Utilities {
    constructor() {

    }

    equalsIgnoringCase(text, other) {
        return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
    }

    async generateActualDateTime() {
        let currentdate = new Date();
        let actualMoment = currentdate.getFullYear() + "-" + currentdate.getMonth() + "-" + currentdate.getDate() + ":" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        return actualMoment;
    }

    async formatString(expectedString, toReplaceText) {
        return expectedString.replaceAll(/{.+}/ig, toReplaceText);
    }

    async setTestStartTime() {
        return this.generateActualDateTime();
    }
}

export default Utilities;
