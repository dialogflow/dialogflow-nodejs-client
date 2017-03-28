'use strict';

module.exports = class SparkBotConfig {

    get apiaiAccessToken() {
        return this._apiaiAccessToken;
    }

    set apiaiAccessToken(value) {
        this._apiaiAccessToken = value;
    }

    get apiaiLang() {
        return this._apiaiLang;
    }

    set apiaiLang(value) {
        this._apiaiLang = value;
    }

    get sparkToken() {
        return this._sparkToken;
    }

    set sparkToken(value) {
        this._sparkToken = value;
    }

    get devConfig() {
        return this._devConfig;
    }

    set devConfig(value) {
        this._devConfig = value;
    }

    constructor(apiaiAccessToken, apiaiLang, sparkToken) {
        this._apiaiAccessToken = apiaiAccessToken;
        this._apiaiLang = apiaiLang;
        this._sparkToken = sparkToken;
    }

    toPlainDoc() {
        return {
            apiaiAccessToken: this._apiaiAccessToken,
            apiaiLang: this._apiaiLang,
            sparkToken: this._sparkToken
        }
    }

    static fromPlainDoc(doc) {
        return new SparkBotConfig(
            doc.apiaiAccessToken,
            doc.apiaiLang,
            doc.sparkToken);
    }
};