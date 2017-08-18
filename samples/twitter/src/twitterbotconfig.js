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