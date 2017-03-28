'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const Twit = require('twit');

module.exports = class TwitterBot {

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
            requestSource: "twitter"
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();

        this._botnameRegexp = new RegExp("(" + this.escapeRegExp("@" + this.botConfig.botName) + ")", "gi");
    }

    start() {
        this._t = new Twit({
            consumer_key: this.botConfig.consumerKey,
            consumer_secret: this.botConfig.consumerSecret,
            access_token: this.botConfig.accessToken,
            access_token_secret: this.botConfig.accessTokenSecret
        });

        this._stream = this._t.stream('user');

        this._stream.on('tweet', (tweet) => {
            console.log('tweet');
            this.processMessage(tweet);
        });

        this._stream.on('direct_message', (dm) => {
            console.log('direct_message');
            this.processDirectMessage(dm);
        });
    }

    stop() {
        this._stream.stop()
    }

    processMessage(tweet) {
        if (this._botConfig.devConfig) {
            console.log("body", tweet);
        }

        if (tweet.text && tweet.user) {
            let chatId = tweet.user.id_str;
            let messageText = tweet.text;
            let userName = tweet.user.screen_name;

            if (this.botConfig.botName.toLowerCase() == tweet.user.screen_name.toLowerCase()) {
                // bot received his own tweet
                return;
            }

            if (!tweet.entities.user_mentions || tweet.entities.user_mentions.length == 0) {
                return;
            }

            //we will check if tweet contains mention of the bot
            let mentions = tweet.entities.user_mentions;
            let bot_mention = mentions.find((mention) => {
                return mention.screen_name.toLowerCase() == this.botConfig.botName.toLowerCase();
            });

            if (!bot_mention) {
                return;
            }

            if (tweet.entities.urls.length > 0) {
                // don't respond to tweets containing links
                return;
            }

            if (tweet.retweeted_status) {
                // ignore retweets
                return;
            }

            // remove bot mention from message text
            messageText = messageText.replace(this._botnameRegexp, "");

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
                    if (TwitterBot.isDefined(response.result)
                        && response.result.fulfillment
                        && response.result.fulfillment.speech) {

                        let responseText = "@" + userName + " " + response.result.fulfillment.speech;

                        if (responseText.length > 140) {
                            responseText = responseText.substr(0, 139) + "…";
                        }

                        console.log('Response as text message');
                        this._t.post('statuses/update', {status: responseText, in_reply_to_status_id: tweet.id_str}, (err, data, response) => {
                            if (err) {
                                console.error('Response as tweet error', err);
                            } else {
                                console.log('Response as tweet succeeded');
                            }
                        });

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

    processDirectMessage(dm) {
        let text = dm.direct_message.text;
        let sender = dm.direct_message.sender_id_str;
        let chatId = "dm_" + sender;
        let recipient = dm.direct_message.recipient_id_str;

        if (sender != recipient && text) {

            if (!this._sessionIds.has(chatId)) {
                this._sessionIds.set(chatId, uuid.v1());
            }

            let apiaiRequest = this._apiaiService.textRequest(text,
                {
                    sessionId: this._sessionIds.get(chatId)
                });

            apiaiRequest.on('response', (response) => {
                if (TwitterBot.isDefined(response.result)
                    && response.result.fulfillment
                    && response.result.fulfillment.speech) {

                    let responseText = response.result.fulfillment.speech;

                    console.log('Response as text message');
                    this._t.post('direct_messages/new', {
                        user_id: sender,
                        text: responseText
                    }, (err, data, response) => {
                        if (err) {
                            console.error('Response error', err);
                        } else {
                            console.log('Response as direct message succeeded');
                        }
                    });

                } else {
                    console.log('Received empty result')
                }
            });

            apiaiRequest.on('error', (error) => console.error(error));
            apiaiRequest.end();
        }
    }

    escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
