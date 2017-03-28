'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const request = require('request');

const TwilioIPMessaging = require('twilio-ip-messaging');
const TwilioCommon = require('twilio-common');
var AccessToken = require('twilio').AccessToken;
var IpMessagingGrant = AccessToken.IpMessagingGrant;

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
            requestSource: "twilio-ip"
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();
    }

    start() {
        this.getToken()
            .then((token) => {
                this._accessManager = new TwilioCommon.AccessManager(token);
                this._client = TwilioIPMessaging(this._accessManager);

                this._client.on('messageAdded', (message) => this.processMessage(message));

                return this._client.initialize();
            })
            .then(()=> {
                console.log("IP client initialized");

                this.tryToJoin();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getToken() {
        return new Promise((resolve, reject) => {
            var appName = this.botConfig.apiaiAccessToken;
            var deviceId = "server";

            // Create a unique ID for the client on their current device
            var endpointId = "TwilioChat:" + this.botConfig.botIdentity + ":browser";

            // Create a "grant" which enables a client to use IPM as a given user,
            // on a given device
            var ipmGrant = new IpMessagingGrant({
                serviceSid: this.botConfig.serviceSid,
                endpointId: endpointId
            });

            // Create an access token which we will sign and return to the client,
            // containing the grant we just created
            var token = new AccessToken(
                this.botConfig.accountSid,
                this.botConfig.signingKeySid,
                this.botConfig.signingKeySecret
            );
            token.addGrant(ipmGrant);
            token.identity = this.botConfig.botIdentity;

            resolve(token.toJwt());
        });
    }

    processMessage(message) {
        console.log("message", message);

        if (message.body && message.channel && message.channel.sid) {
            let chatId = message.channel.sid;
            let messageText = message.body;
            let currentChannel = message.channel;

            if (message.author == this.botConfig.botIdentity) {
                // skip bot's messages
                return;
            }

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
                    if (TwilioBot.isDefined(response.result)) {
                        let responseText = response.result.fulfillment.speech;

                        if (TwilioBot.isDefined(responseText)) {
                            console.log('Response as text message');

                            currentChannel.sendMessage(responseText)
                                .then(()=>{
                                    console.log("Message sent");
                                })
                                .catch((err) =>{
                                   console.log("Error while sending message", err);
                                });
                        } else {
                            console.log('Received empty speech');
                        }
                    } else {
                        console.log('Received empty result');
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

    static isDefined(obj) {
        if (typeof obj == 'undefined') {
            return false;
        }

        if (!obj) {
            return false;
        }

        return obj != null;
    }

    tryToJoin() {
        this._client.getChannelByUniqueName('bot_channel')
            .then((channel)=> {
                if (!channel) {
                    this._client.createChannel({
                        uniqueName: 'bot_channel',
                        friendlyName: 'Channel for API.AI bot'
                    }).then(function (createdChannel) {
                        console.log("Created channel 'bot_channel'");
                        createdChannel.join().then(()=>{
                            createdChannel.sendMessage("Hello, I'm API.AI Bot.");
                        });
                    });
                } else {
                    channel.join().then(()=>{
                        channel.sendMessage("Hello, I'm API.AI Bot.");
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }
}