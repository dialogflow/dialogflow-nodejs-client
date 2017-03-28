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

            console.log(chatId, messageText);

            if (messageText) {
                if (!this._sessionIds.has(chatId)) {
                    this._sessionIds.set(chatId, uuid.v1());
                }

                let apiaiRequest = this._apiaiService.textRequest(messageText,
                    {
                        sessionId: this._sessionIds.get(chatId)
                    });

                apiaiRequest.on('response', (response) => {
                    if (TropoBot.isDefined(response.result)) {
                        let responseText = response.result.fulfillment.speech;

                        if (TropoBot.isDefined(responseText)) {
                            console.log('Response as text message');

                            res.status(200).json({
                                tropo: [{say: {value: responseText}}]
                            });

                        } else {
                            console.log('Received empty speech');
                            return res.status(400).end('Received empty speech');
                        }
                    } else {
                        console.log('Received empty result');
                        return res.status(400).end('Received empty result');
                    }
                });

                apiaiRequest.on('error', (error) => console.error(error));
                apiaiRequest.end();
            }
            else {
                console.log('Empty message');
                return res.status(400).end('Empty message');
            }
        } else {
            console.log('Empty message');
            return res.status(400).end('Empty message');
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