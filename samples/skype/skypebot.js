'use strict';

const apiai = require('apiai');
const uuid = require('node-uuid');
const botbuilder = require('botbuilder');

module.exports = class SkypeBot {

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

    get botService() {
        return this._botService;
    }

    set botService(value) {
        this._botService = value;
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
            requestSource: "skype"
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();

        this.botService = new botbuilder.ChatConnector({
            appId: this.botConfig.skypeAppId,
            appPassword: this.botConfig.skypeAppSecret
        });

        this._bot = new botbuilder.UniversalBot(this.botService);

        this._bot.dialog('/', (session) => {
            if (session.message && session.message.text) {
                this.processMessage(session);
            }
        });

    }

    processMessage(session) {

        let messageText = session.message.text;
        let sender = session.message.address.conversation.id;

        if (messageText && sender) {

            console.log(sender, messageText);

            if (!this._sessionIds.has(sender)) {
                this._sessionIds.set(sender, uuid.v1());
            }

            let apiaiRequest = this._apiaiService.textRequest(messageText,
                {
                    sessionId: this._sessionIds.get(sender),
                    originalRequest: {
                        data: session.message,
                        source: "skype"
                    }
                });

            apiaiRequest.on('response', (response) => {
                if (this._botConfig.devConfig) {
                    console.log(sender, "Received api.ai response");
                }

                if (SkypeBot.isDefined(response.result) && SkypeBot.isDefined(response.result.fulfillment)) {
                    let responseText = response.result.fulfillment.speech;
                    let responseMessages = response.result.fulfillment.messages;

                    if (SkypeBot.isDefined(responseMessages) && responseMessages.length > 0) {
                        this.doRichContentResponse(session, responseMessages);
                    } else if (SkypeBot.isDefined(responseText)) {
                        console.log(sender, 'Response as text message');
                        session.send(responseText);

                    } else {
                        console.log(sender, 'Received empty speech');
                    }
                } else {
                    console.log(sender, 'Received empty result');
                }
            });

            apiaiRequest.on('error', (error) => {
                console.error(sender, 'Error while call to api.ai', error);
            });

            apiaiRequest.end();
        } else {
            console.log('Empty message');
        }
    }

    doRichContentResponse(session, messages) {

        for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
            let message = messages[messageIndex];

            switch (message.type) {
                //message.type 0 means text message
                case 0:
                    {

                        if (SkypeBot.isDefined(message.speech)) {
                            session.send(message.speech);
                        }

                    }

                    break;

                    //message.type 1 means card message
                case 1:
                    {
                        let heroCard = new botbuilder.HeroCard(session).title(message.title);

                        if (SkypeBot.isDefined(message.subtitle)) {
                            heroCard = heroCard.subtitle(message.subtitle)
                        }

                        if (SkypeBot.isDefined(message.imageUrl)) {
                            heroCard = heroCard.images([botbuilder.CardImage.create(session, message.imageUrl)]);
                        }

                        if (SkypeBot.isDefined(message.buttons)) {

                            let buttons = [];

                            for (let buttonIndex = 0; buttonIndex < message.buttons.length; buttonIndex++) {
                                let messageButton = message.buttons[buttonIndex];
                                if (messageButton.text) {
                                    let postback = messageButton.postback;
                                    if (!postback) {
                                        postback = messageButton.text;
                                    }

                                    let button;

                                    if (postback.startsWith("http")) {
                                        button = botbuilder.CardAction.openUrl(session, postback, messageButton.text);
                                    } else {
                                        button = botbuilder.CardAction.postBack(session, postback, messageButton.text);
                                    }

                                    buttons.push(button);
                                }
                            }

                            heroCard.buttons(buttons);

                        }

                        let msg = new botbuilder.Message(session).attachments([heroCard]);
                        session.send(msg);

                    }

                    break;

                    //message.type 2 means quick replies message
                case 2:
                    {

                        let replies = [];

                        let heroCard = new botbuilder.HeroCard(session).title(message.title);

                        if (SkypeBot.isDefined(message.replies)) {

                            for (let replyIndex = 0; replyIndex < message.replies.length; replyIndex++) {
                                let messageReply = message.replies[replyIndex];
                                let reply = botbuilder.CardAction.postBack(session, messageReply, messageReply);
                                replies.push(reply);
                            }

                            heroCard.buttons(replies);
                        }

                        let msg = new botbuilder.Message(session).attachments([heroCard]);
                        session.send(msg);

                    }

                    break;

                    //message.type 3 means image message
                case 3:
                    {
                        let heroCard = new botbuilder.HeroCard(session).images([botbuilder.CardImage.create(session, message.imageUrl)]);
                        let msg = new botbuilder.Message(session).attachments([heroCard]);
                        session.send(msg);
                    }

                    break;

                default:

                    break;
            }
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