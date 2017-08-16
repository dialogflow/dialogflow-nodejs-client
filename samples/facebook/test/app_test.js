'use strict';

const APIAI_ACCESS_TOKEN = 'api_ai_access_token';
const FB_VERIFY_TOKEN = 'fb_verify_token';
const FB_PAGE_ACCESS_TOKEN = 'fb_access_token';
const APIAI_LANG = 'en';

process.env['APIAI_ACCESS_TOKEN'] = APIAI_ACCESS_TOKEN;
process.env['FB_VERIFY_TOKEN'] = FB_VERIFY_TOKEN;
process.env['FB_PAGE_ACCESS_TOKEN'] = FB_PAGE_ACCESS_TOKEN;
process.env['APIAI_LANG'] = APIAI_LANG;

const supertest = require('supertest');
const should = require('should');
const rewire = require('rewire');
const app = rewire('../src/app');

const server = supertest.agent('http://localhost:5000');

describe('app', () => {

    beforeEach((done) => {
        done();
    });

    it('should pass verification', function (done) {

        const challengeValue = 'secret';
        const verifyToken = FB_VERIFY_TOKEN;

        server
            .get(`/webhook?hub.verify_token=${verifyToken}&hub.challenge=${challengeValue}`)
            .set('Accept', 'text/plain')
            .expect(200, challengeValue)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should fail verification if wrong params', function (done) {

        const challengeValue = 'secret';
        const verifyToken = 'wrongtoken';

        server
            .get(`/webhook?hub.verify_token=${verifyToken}&hub.challenge=${challengeValue}`)
            .set('Accept', 'text/plain')
            .expect(200, "Error, wrong validation token")
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it("/webhook should response", function (done) {

        let fbBot = app.__get__('facebookBot');
        fbBot.processEvent = ()=>{};

        // https://developers.facebook.com/docs/messenger-platform/webhook-reference#common_format
        server
            .post('/webhook')
            .set('Accept', 'application/json')
            .send({
                entry: [
                    {
                        messaging: [
                            {
                                sender: {
                                    id: "99102094378730843167656799"
                                },
                                message: {
                                    text: "hello"
                                }
                            }
                        ]
                    }
                ]
            })
            .expect(200, {status: "ok"})
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it("/webhook should response on postback", function (done) {

        let fbBot = app.__get__('facebookBot');
        fbBot.processEvent = ()=>{};

        server
            .post('/webhook')
            .set('Accept', 'application/json')
            .send({
                entry: [
                    {
                        messaging: [
                            {
                                sender: {
                                    id: "99102094378730843167656799"
                                },
                                postback: {
                                    payload: "hello"
                                }
                            }
                        ]
                    }
                ]
            })
            .expect(200, {status: "ok"})
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it("doRichContentResponse should process all rich content types", (done) => {
        let textMessage = {type: 0, speech: 'sample speech'};
        let wrongTextMessage = {type: 0};

        let fbTextMessage = {text: 'sample speech'};

        let cardMessage1 = {
            "title": "Kitten",
            "subtitle": "Cat",
            "imageUrl": "https://example.com/cat.jpg",
            "buttons": [
                {
                    "text": "Buy",
                    "postback": "buy"
                }
            ],
            "type": 1
        };

        let cardMessage2 = {
            "title": "Gnome",
            "imageUrl": "https://example.com/gnome.png",
            "buttons": [
                {
                    "text": "Info",
                    "postback": "info"
                },
                {
                    "text": "Gnome info",
                    "postback": "https://example.com/gnome"
                }
            ],
            "type": 1
        };

        let fbCardsMessage = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: 'Kitten',
                            image_url: 'https://example.com/cat.jpg',
                            subtitle: 'Cat',
                            buttons: [{type: 'postback', title: 'Buy', payload: 'buy'}]
                        },
                        {
                            title: 'Gnome',
                            image_url: 'https://example.com/gnome.png',
                            buttons: [
                                {type: 'postback', title: 'Info', payload: 'info'},
                                {type: 'web_url', title: 'Gnome info', url: 'https://example.com/gnome'}
                            ]
                        }
                    ]
                }
            }
        };

        let repliesMessage = {type: 2, title: 'Replies title', replies: ['first', 'second']};
        let fbRepliesMessage = {text: 'Replies title',
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'first',
                    payload: 'first'
                },
                {
                    content_type: 'text',
                    title: 'second',
                    payload: 'second'
                }]
        };

        let repliesMessage2 = {type: 2, replies: ['without title']};
        let fbRepliesMessage2 = {
            text: 'Choose an item',
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'without title',
                    payload: 'without title'
                }
            ]
        };

        let wrongRepliesMessage = {type: 2};

        let imageMessage = {type: 3, imageUrl: 'https://example.com/1.png'};
        let fbImageMessage = {attachment: {type: 'image', payload: {url: 'https://example.com/1.png'}}};

        let wrongImageMessage = {type: 3};

        let payloadMessage = {type:4, payload: {facebook: {text: 'some facebook payload'}}};
        let fbPayloadMessage = {text: 'some facebook payload'};

        let wrongPayloadMessage = {type: 4};

        let unknownType = {type: 10, someData: {}};

        let cardMessage3 = {
            "title": "Kitten",
            "imageUrl": "https://example.com/cat.jpg",
            "buttons": [
                {
                    "text": "More Info"
                }
            ],
            "type": 1
        };
        let fbCardMessage2 = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: 'Kitten',
                            image_url: 'https://example.com/cat.jpg',
                            buttons: [{type: 'postback', title: 'More Info', payload: 'More Info'}]
                        }
                    ]
                }
            }
        };

        let expectedMessages = [fbTextMessage, fbCardsMessage, fbRepliesMessage, fbRepliesMessage2, fbImageMessage, fbPayloadMessage, fbCardMessage2];
        let counter = 0;
        let resultMessages = [];

        let fbBot = app.__get__('facebookBot');

        fbBot.messagesDelay = 10;

        fbBot.sendFBSenderAction = (sender, action) => {
            return Promise.resolve();
        };

        fbBot.sendFBMessage = (sender, messageData) => {
            counter += 1;
            resultMessages.push(messageData);
            return Promise.resolve();
        };


        fbBot.doRichContentResponse('senderId', [
            textMessage,
            wrongTextMessage,
            cardMessage1,
            cardMessage2,
            repliesMessage,
            repliesMessage2,
            wrongRepliesMessage,
            unknownType,
            imageMessage,
            wrongImageMessage,
            payloadMessage,
            wrongPayloadMessage,
            cardMessage3
        ])
        .then(() => {
            resultMessages.should.deepEqual(expectedMessages);
            done();
        })
        .catch(done);
    });

    it("chunkString should split string to parts", () => {

        let fbBot = app.__get__('facebookBot');
        let chunkString = fbBot.chunkString;

        let stringToSplit = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        let expected = ['Lorem ipsum ', 'dolor sit amet, ', 'consectetur ', 'adipiscing ', 'elit.'];

        let result = chunkString(stringToSplit, 15);
        result.forEach(s => s.length.should.lessThan(17));

        result.should.deepEqual(expected);
    });

    it("getEventText should get right text", () => {

        const fbBot = app.__get__('facebookBot');
        const getEventText = fbBot.getEventText;

        should(getEventText({})).be.equal(null);
        should(getEventText({message: {}})).be.equal(null);

        const expectedText = 'expectedText';

        const simpleMessage = {
            "message": {
                "text": expectedText,
            }
        };
        getEventText(simpleMessage).should.be.equal(expectedText);

        const postbackMessage = {
            "postback": {
                "payload": expectedText
            }
        };
        getEventText(postbackMessage).should.be.equal(expectedText);

        const quickReplyMessage = {
            "message": {
                "text": "Red",
                "quick_reply": {
                    "payload": expectedText
                }
            }
        };
        getEventText(quickReplyMessage).should.be.equal(expectedText);

    });

});