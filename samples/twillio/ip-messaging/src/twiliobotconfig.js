'use strict';

module.exports = class TwilioBotConfig {

    get botIdentity() {
        return this._botIdentity;
    }

    set botIdentity(value) {
        this._botIdentity = value;
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

    get accountSid() {
        return this._accountSid;
    }

    set accountSid(value) {
        this._accountSid = value;
    }

    get serviceSid() {
        return this._serviceSid;
    }

    set serviceSid(value) {
        this._serviceSid = value;
    }

    get signingKeySid() {
        return this._signingKeySid;
    }

    set signingKeySid(value) {
        this._signingKeySid = value;
    }

    get signingKeySecret() {
        return this._signingKeySecret;
    }

    set signingKeySecret(value) {
        this._signingKeySecret = value;
    }

    get devConfig() {
        return this._devConfig;
    }

    set devConfig(value) {
        this._devConfig = value;
    }

    constructor(apiaiAccessToken, apiaiLang, accountSid, serviceSid, signingKeySid, signingKeySecret) {
        this.botIdentity = "bot";
        this._apiaiAccessToken = apiaiAccessToken;
        this._apiaiLang = apiaiLang;
        this._accountSid = accountSid;
        this._serviceSid = serviceSid;
        this._signingKeySid = signingKeySid;
        this._signingKeySecret = signingKeySecret;
    }
};