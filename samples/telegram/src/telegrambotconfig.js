'use strict';

module.exports = class TelegramBotConfig {
    
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

    get telegramToken() {
        return this._telegramToken;
    }

    set telegramToken(value) {
        this._telegramToken = value;
    }

    get devConfig() {
        return this._devConfig;
    }

    set devConfig(value) {
        this._devConfig = value;
    }

    constructor(apiaiAccessToken, apiaiLang, telegramToken) {
        this._apiaiAccessToken = apiaiAccessToken;
        this._apiaiLang = apiaiLang;
        this._telegramToken = telegramToken;
    }

    toPlainDoc() {
        return {
            apiaiAccessToken: this._apiaiAccessToken,
            apiaiLang: this._apiaiLang,
            telegramToken: this._telegramToken
        }
    }

    static fromPlainDoc(doc){
        return new TelegramBotConfig(
            doc.apiaiAccessToken,
            doc.apiaiLang, 
            doc.telegramToken);
    }
};