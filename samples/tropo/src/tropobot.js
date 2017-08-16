'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const request = require('request');

module.exports = class TropoBot {

    get apiaiService() {
        return this._apiaiService;
    }

    set apiaiService(value) {
        this._apiaiService = value;
    }

    get botConfig() {
        return this._botConfig;
    }

    set botConfig(value) {
        this._botConfig = value;
    }

    get sessionIds() {
        return this._sessionIds;
    }

    set sessionIds(value) {
        this._sessionIds = value;
    }

    constructor(botConfig) {
        this._botConfig = botConfig;
        var apiaiOptions = {
            language: botConfig.apiaiLang,
            requestSource: "tropo"
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();
    }

    processMessage(req, res) {
        if (this._botConfig.devConfig) {
            console.log("body", req.body);
        }

        if (req.body && req.body.session && req.body.session.from && req.body.session.initialText) {
            let chatId = req.body.session.from.id;
            let messageText = req.body.session.initialText;

            if (messageText) {
                if (!this._sessionIds.has(chatId)) {
                    this._sessionIds.set(chatId, uuid.v4());
                }

                let sessionId = this._sessionIds.get(chatId);

                console.log(chatId, messageText);

                let apiaiRequest = this._apiaiService.textRequest(messageText,
                    {
                        sessionId: sessionId,
                        originalRequest: {
                            data: req.body.session,
                            source: "tropo"
                        }
                    });

                apiaiRequest.on('response', (response) => {
                    if (TropoBot.isDefined(response.result)) {
                        let responseMessages = response.result.fulfillment.messages;
                        let tropoMessages = [];

                        responseMessages.forEach((responseCard) => {
                            // non-ASCII character for double quotes needs to be converted back to double quotes
                            let speech = responseCard.speech.replace('“', '"').replace('”', '"');

                            if (TropoBot.isDefined(speech)) {
                                tropoMessages.push({say: {value: speech}});

                                // NOTE: Tropo suggested this delay between each message to guarantee SMS delivery order
                                tropoMessages.push({wait: {milliseconds: 2500}});
                            }
                        });

                        // Remove last "wait"
                        tropoMessages.pop();

                        if (tropoMessages.length > 0) {
                            console.log(chatId, "Responding " + tropoMessages.length + " text messages (status: 200)");
                            res.setHeader("Content-Type", "application/json");
                            res.status(200).end(JSON.stringify({tropo: tropoMessages}));
                        } else {
                            console.log(chatId, 'Responding without any messages (status: 400)');
                            res.status(400).end('Received empty speech');
                        }
                    } else {
                        console.log(chatId, 'Received empty result (status: 400)');
                        res.status(400).end('Received empty result');
                    }
                });

                apiaiRequest.on('error', (error) => console.error(error));
                apiaiRequest.end();
            } else {
                console.log(chatId, 'Empty message');
                res.status(400).end('Empty message');
            }
        } else {
            console.log(chatId, 'Empty message');
            res.status(400).end('Empty message');
        }
    }

    static isDefined(obj) {
        if (typeof obj == 'undefined') {
            return false;
        }

        if (!obj) {
            return false;
        }

        return obj != null;
    }
}
