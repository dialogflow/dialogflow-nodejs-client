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