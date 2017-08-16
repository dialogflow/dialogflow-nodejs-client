'use strict';

module.exports = class LineBotConfig {

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

  get channelId() {
    return this._channelId;
  }

  set channelId(value) {
    this._channelId = value;
  }

  get channelSecret() {
    return this._channelSecret;
  }

  set channelSecret(value) {
    this._channelSecret = value;
  }

  get channelAccessToken() {
    return this._channelAccessToken;
  }

  set channelAccessToken(value) {
    this._channelAccessToken = value;
  }

  get devConfig() {
    return this._devConfig;
  }

  set devConfig(value) {
    this._devConfig = value;
  }

  constructor(apiaiAccessToken, apiaiLang, channelId, channelSecret,
      channelAccessToken) {
    this._apiaiAccessToken = apiaiAccessToken;
    this._apiaiLang = apiaiLang;
    this._channelId = channelId;
    this._channelSecret = channelSecret;
    this._channelAccessToken = channelAccessToken;
  }

  toPlainDoc() {
    return {
      apiaiAccessToken: this._apiaiAccessToken,
      apiaiLang: this._apiaiLang,
      channelId: this._channelId,
      channelSecret: this.channelSecret,
      channelAccessToken: this._channelAccessToken
    }
  }

  static fromPlainDoc(doc) {
    return new LineBotConfig(
        doc.apiaiAccessToken,
        doc.apiaiLang,
        doc.channelId,
        doc.channelSecret,
        doc.channelAccessToken);
  }
};