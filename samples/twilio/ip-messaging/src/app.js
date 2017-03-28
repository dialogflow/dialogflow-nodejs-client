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