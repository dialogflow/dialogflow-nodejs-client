'use strict';

module.exports = class TropoBotConfig {

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

    get devConfig() {
        return this._devConfig;
    }

    set devConfig(value) {
        this._devConfig = value;
    }

    constructor(apiaiAccessToken, apiaiLang) {
        this._apiaiAccessToken = apiaiAccessToken;
        this._apiaiLang = apiaiLang;
    }

    toPlainDoc() {
        return {
            apiaiAccessToken: this._apiaiAccessToken,
            apiaiLang: this._apiaiLang
        }
    }

    static fromPlainDoc(doc){
        return new TropoBotConfig(
            doc.apiaiAccessToken,
            doc.apiaiLang);
    }
};