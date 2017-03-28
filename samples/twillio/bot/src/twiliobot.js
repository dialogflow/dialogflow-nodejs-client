'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const request = require('request');
const xmlescape = require('xml-escape');

module.exports = class TwilioBot {

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
            requestSource: "twilio"
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();
    }

    processMessage(req, res) {
        if (this._botConfig.devConfig) {
            console.log("body", req.body);
        }

        if (req.body && req.body.From && req.body.Body) {
            let chatId = req.body.From;
            let messageText = req.body.Body;

            console.log(chatId, messageText);
            
            if (messageText) {
                if (!this._sessionIds.has(chatId)) {
                    this._sessionIds.set(chatId, uuid.v4());
                }

                let apiaiRequest = this._apiaiService.textRequest(messageText,
                    {
                        sessionId: this._sessionIds.get(chatId),
                        originalRequest: {
                            data: req.body,
                            source: "twilio"
                        }
                    });

                apiaiRequest.on('response', (response) => {
                    if (TwilioBot.isDefined(response.result)) {
                        let responseText = response.result.fulfillment.speech;

                        if (TwilioBot.isDefined(responseText)) {
                            console.log('Response as text message');
                            res.setHeader("Content-Type", "application/xml");
                            res.status(200).end("<Response><Message>" + xmlescape(responseText) + "</Message></Response>");
                        } else {
                            console.log('Received empty speech');
                        }
                    } else {
                        console.log('Received empty result')
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