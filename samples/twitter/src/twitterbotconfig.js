'use strict';

module.exports = class TwitterBotConfig {

    get botName() {
        return this._botName;
    }

    set botName(value) {
        this._botName = value;
    }

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

    get consumerKey() {
        return this._consumerKey;
    }

    set consumerKey(value) {
        this._consumerKey = value;
    }

    get consumerSecret() {
        return this._consumerSecret;
    }

    set consumerSecret(value) {
        this._consumerSecret = value;
    }

    get accessToken() {
        return this._accessToken;
    }

    set accessToken(value) {
        this._accessToken = value;
    }

    get accessTokenSecret() {
        return this._accessTokenSecret;
    }

    set accessTokenSecret(value) {
        this._accessTokenSecret = value;
    }

    get devConfig() {
        return this._devConfig;
    }

    set devConfig(value) {
        this._devConfig = value;
    }

    constructor(apiaiAccessToken, apiaiLang, botName, consumerKey, consumerSecret, accessToken, accessTokenSecret) {
        this.apiaiAccessToken = apiaiAccessToken;
        this.apiaiLang = apiaiLang;

        this.botName = botName;
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.accessToken = accessToken;
        this.accessTokenSecret = accessTokenSecret;
    }
};