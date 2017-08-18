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

const express = require('express');

const TwilioBot = require('./twiliobot');
const TwilioBotConfig = require('./twiliobotconfig');

const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';

const APIAI_ACCESS_TOKEN = process.env.APIAI_ACCESS_TOKEN;
const APIAI_LANG = process.env.APIAI_LANG;

const ACCOUNT_SID = process.env.ACCOUNT_SID;
const SERVICE_SID = process.env.SERVICE_SID;
const SIGNING_KEY_SID = process.env.SIGNING_KEY_SID;
const SIGNING_KEY_SECRET = process.env.SIGNING_KEY_SECRET;

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const botConfig = new TwilioBotConfig(APIAI_ACCESS_TOKEN, APIAI_LANG, ACCOUNT_SID, SERVICE_SID, SIGNING_KEY_SID, SIGNING_KEY_SECRET);
const bot = new TwilioBot(botConfig);
bot.start();

const app = express();
app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});