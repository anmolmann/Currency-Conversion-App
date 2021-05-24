import React from "react";

class Util {
    static getListOfCountriesURI() {
        return "https://restcountries.eu/rest/v2/all";
    }

    static getExchangeURI(baseCurrency) {
        return "https://v6.exchangerate-api.com/v6/95c0426dcce2f3028f6082cd/latest/" + baseCurrency;
    }

    static isNullNoneOrSpacesOnly(value) {
        return (value == null) ||
            (value == undefined) ||
            (value.trim() == '') ||
            (value == '(none)');
    }

    static isValidNumber(value) {
        return isNaN(value);
    }
}

export default Util;