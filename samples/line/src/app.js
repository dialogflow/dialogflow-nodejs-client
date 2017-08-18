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
const bodyParser = require('body-parser');
const crypto = require('crypto');

const LineBot = require('./linebot');
const LineBotConfig = require('./linebotconfig');

const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';

const APIAI_ACCESS_TOKEN = process.env.APIAI_ACCESS_TOKEN;
const APIAI_LANG = process.env.APIAI_LANG;

const LINE_CHANNEL_ID = process.env.LINE_CHANNEL_ID;
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const botConfig = new LineBotConfig(APIAI_ACCESS_TOKEN, APIAI_LANG,
    LINE_CHANNEL_ID,
    LINE_CHANNEL_SECRET,
    LINE_CHANNEL_ACCESS_TOKEN);

const bot = new LineBot(botConfig);

const app = express();

app.use(bodyParser.json({
  verify: function (req, res, buf, encoding) {
    // raw body for signature check
    req.rawBody = buf.toString();
  }
}));

app.post('/webhook', (req, res) => {

  console.log('POST received');
  console.log(JSON.stringify(req.body));

  let signature = req.get('X-LINE-Signature');
  let rawBody = req.rawBody;
  let hash = crypto.createHmac('sha256', LINE_CHANNEL_SECRET).update(
      rawBody).digest('base64');

  if (hash !== signature) {
    this.log("Unauthorized request");
    return res.status(401).send('Wrong request signature');
  }

  res.status(200).send("OK");

  try {

    req.body.events.forEach((item) => {
      if (item.type === "message") {
        if (item.replyToken !== "00000000000000000000000000000000"
            && item.replyToken !== "ffffffffffffffffffffffffffffffff") {

          bot.processMessage(item, res)
              .catch(err => console.error(err));
        }
      } else if (item.type === "postback") {
        const postbackData = item.postback ? item.postback.data : '';
        console.log("postbackData", postbackData);
      }
    });

  } catch (err) {
    console.error('Error while message processing', err);
  }
});

app.listen(REST_PORT, function () {
  console.log(`Service is ready on port ${REST_PORT}`);
});