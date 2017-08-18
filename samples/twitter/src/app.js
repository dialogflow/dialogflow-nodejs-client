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

const TwitterBot = require('./twitterbot');
const TwitterBotConfig = require('./twitterbotconfig');

const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const botConfig = new TwitterBotConfig(
    process.env.APIAI_ACCESS_TOKEN,
    process.env.APIAI_LANG,
    process.env.BOT_NAME,
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    process.env.ACCESS_TOKEN,
    process.env.ACCESS_TOKEN_SECRET
);

botConfig.devConfig = DEV_CONFIG;

const bot = new TwitterBot(botConfig);
bot.start();

const app = express();
app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});