'use strict';

module.exports = class SkypeBotConfig {

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

    get skypeBotId() {
        return this._skypeBotId;
    }

    set skypeBotId(value) {
        this._skypeBotId = value;
    }

    get skypeAppId() {
        return this._skypeAppId;
    }

    set skypeAppId(value) {
        this._skypeAppId = value;
    }

    get skypeAppSecret() {
        return this._skypeAppSecret;
    }

    set skypeAppSecret(value) {
        this._skypeAppSecret = value;
    }

    get devConfig() {
        return this._devConfig;
    }

    set devConfig(value) {
        this._devConfig = value;
    }

    constructor(apiaiAccessToken, apiaiLang, appId, appSecret) {
        this._apiaiAccessToken = apiaiAccessToken;
        this._apiaiLang = apiaiLang;
        this._skypeAppId = appId;
        this._skypeAppSecret = appSecret;
    }

    toPlainDoc() {
        return {
            apiaiAccessToken: this._apiaiAccessToken,
            apiaiLang: this._apiaiLang,
            skypeAppId: this._skypeAppId,
            skypeAppSecret: this._skypeAppSecret
        }
    }

    static fromPlainDoc(doc){
        return new SkypeBotConfig(
            doc.apiaiAccessToken,
            doc.apiaiLang,
            doc.skypeAppId, 
            doc.skypeAppSecret);
    }
};