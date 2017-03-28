'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const request = require('request');

module.exports = class LineBot {

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
            requestSource: "line"
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();
    }

    processMessage(message, res) {
        if (this._botConfig.devConfig) {
            console.log("message", message);
        }

        if (message.content && message.content.from && message.content.text) {
            let chatId = message.content.from;
            let messageText = message.content.text;

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
                    if (LineBot.isDefined(response.result)) {
                        let responseText = response.result.fulfillment.speech;

                        if (LineBot.isDefined(responseText)) {
                            console.log('Response as text message');
                            this.postLineMessage(chatId, responseText);
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
            }
        } else {
            console.log('Empty message');
        }
    }

    postLineMessage(to, text) {
        request.post("https://trialbot-api.line.me/v1/events", {
            headers: {
                'X-Line-ChannelID': this._botConfig.channelId,
                'X-Line-ChannelSecret': this._botConfig.channelSecret,
                'X-Line-Trusted-User-With-ACL': this._botConfig.MID
            },
            json: {
                to: [to],
                toChannel: 1383378250,
                eventType: "138311608800106203",
                content: {
                    contentType: 1,
                    toType: 1,
                    text: text
                }
            }
        }, function (error, response, body) {
            if (error) {
                console.error('Error while sending message', error);
                return;
            }

            if (response.statusCode != 200) {
                console.error('Error status code while sending message', body);
                return;
            }

            console.log('Send message succeeded');
        });
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