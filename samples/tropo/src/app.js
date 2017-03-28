'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const TropoBot = require('./tropobot');
const TropoBotConfig = require('./tropobotconfig');

const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';

const APIAI_ACCESS_TOKEN = process.env.APIAI_ACCESS_TOKEN;
const APIAI_LANG = process.env.APIAI_LANG;

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const botConfig = new TropoBotConfig(APIAI_ACCESS_TOKEN, APIAI_LANG);
const bot = new TropoBot(botConfig);

const app = express();

app.use(bodyParser.json());

app.post('/sms', (req, res) => {

    console.log('POST sms received');

    try {
        bot.processMessage(req, res);
    } catch (err) {
        return res.status(400).send('Error while processing ' + err.message);
    }
});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});