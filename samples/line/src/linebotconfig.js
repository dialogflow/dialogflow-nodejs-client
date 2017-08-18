/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
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