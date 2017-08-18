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

const apiai = require('apiai');
const uuid = require('uuid');
const request = require('request');
const async = require('async');

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

  getText(message) {
    if (message.message && message.message.type === 'text'
        && message.message.text) {
      return message.message.text;
    }

    return null;
  }

  getChatId(message) {
    if (message.source) {

      if (message.source.type === 'user') {
        return message.source.userId;
      }

      if (message.source.type === 'group') {
        return message.source.groupId;
      }

      if (message.source.type === 'room') {
        return message.source.roomId;
      }
    }
    return null;
  }

  constructor(botConfig) {
    this._botConfig = botConfig;
    let apiaiOptions = {
      language: botConfig.apiaiLang,
      requestSource: "line"
    };

    this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
    this._sessionIds = new Map();
    this._sendMessageInterval = 500;
  }

  processMessage(message, res) {
    if (this._botConfig.devConfig) {
      this.log("message", message);
    }

    let chatId = this.getChatId(message);
    let messageText = this.getText(message);

    if (chatId && messageText) {

      this.log(chatId, messageText);

      if (messageText) {
        if (!this._sessionIds.has(chatId)) {
          this._sessionIds.set(chatId, uuid.v4());
        }

        let apiaiRequest = this._apiaiService.textRequest(messageText,
            {
              sessionId: this._sessionIds.get(chatId)
            });

        apiaiRequest.on('response', (response) => {
          this.processAiResponse(chatId, response, message.replyToken)
              .then(() => this.log('Message sent'))
              .catch((err) => this.logError(err))
        });

        apiaiRequest.on('error', (error) => console.error(error));
        apiaiRequest.end();
      }
      else {
        this.log('Empty message');
      }
    } else {
      this.log('Empty message');
    }
  }

  processAiResponse(chatId, apiaiResponse, replyToken) {

    if (this.isDefined(apiaiResponse.result)) {
      let responseText = apiaiResponse.result.fulfillment.speech;
      let responseMessages = this.filterPlatformMessages(
          apiaiResponse.result.fulfillment.messages, "line");

      if (this.isDefined(responseMessages)
          && responseMessages.length > 0) {
        let lineMessages = this.convertToLineMessages(responseMessages);
        return this.replyWithMessages(chatId, replyToken, lineMessages);
      } else if (this.isDefined(responseText)) {
        this.log('Response as text message');

        const message = {
          type: "text",
          text: responseText
        };
        return this.reply(replyToken, [message]);

      } else {
        this.log('Received empty speech');
        return Promise.resolve(false);
      }
    } else {
      this.log('Received empty result');
      return Promise.resolve(false);
    }
  }

  convertToLineMessages(responseMessages) {
    try {

      const lineMessages = [];

      for (let messageIndex = 0; messageIndex < responseMessages.length;
          messageIndex++) {
        let message = responseMessages[messageIndex];

        switch (message.type) {
          case 0:
            if (message.speech) {
              let lineMessage = {
                type: "text",
                text: message.speech
              };
              lineMessages.push(lineMessage);
            }
            break;
          case 1: {
            let lineMessage = {
              type: "template",
              altText: "Cards are not supported in this client",
              template: {
                type: "buttons"
              }
            };

            if (message.title) {
              lineMessage.template.title = message.title;
            }

            if (message.subtitle) {
              lineMessage.template.text = message.subtitle;
            } else {
              lineMessage.template.text = message.title;
              delete lineMessage.template.title;
            }

            if (message.imageUrl) {
              lineMessage.template.thumbnailImageUrl = message.imageUrl;
            }

            if (message.buttons.length > 0) {
              let actions = [];
              for (let buttonIndex = 0; buttonIndex < message.buttons.length;
                  buttonIndex++) {
                let button = message.buttons[buttonIndex];
                let text = button.text;
                let postback = button.postback;

                if (text) {

                  if (!postback) {
                    postback = text;
                  }

                  if (postback.startsWith('http')) {
                    actions.push({
                      type: "uri",
                      label: text,
                      uri: postback
                    });
                  } else {
                    actions.push({
                      type: "postback",
                      label: text,
                      data: postback,
                      text: postback
                    });
                  }
                }
              }

              if (actions.length > 0 && lineMessage.template.text) {
                lineMessage.template.actions = actions;
                lineMessages.push(lineMessage);
              }
            }
          }
            break;
          case 2: {
            let lineMessage = {
              type: "template",
              altText: "Cards are not supported in this client",
              template: {
                type: "buttons"
              }
            };
            lineMessage.template.text = message.title ? message.title
                : 'Choose an item';

            let actions = [];
            for (let replyIndex = 0; replyIndex < message.replies.length;
                replyIndex++) {
              let actionText = message.replies[replyIndex];
              actions.push({
                type: "postback",
                label: actionText,
                data: actionText,
                text: actionText
              });
            }

            if (actions.length > 0) {
              lineMessage.template.actions = actions;
              lineMessages.push(lineMessage);
            }
          }
            break;
          case 3: {
            if (message.imageUrl) {
              let lineMessage =
                  {
                    type: "image",
                    originalContentUrl: message.imageUrl,
                    previewImageUrl: message.imageUrl
                  };

              lineMessages.push(lineMessage);
            }
          }
            break;
          case 4:
            if (message.payload && message.payload.line) {
              lineMessages.push(message.payload.line);
            }
            break;
          default:
            break;
        }
      }

      return lineMessages;
    } catch (err) {
      return [];
    }
  }

  replyWithMessages(chatId, replyToken, lineMessages) {
    if (lineMessages && lineMessages.length > 0) {

      if (lineMessages.length <= 5) {
        // Line reply limit
        return this.reply(replyToken, lineMessages);
      } else {
        return new Promise((resolve, reject) => {
          async.eachSeries(lineMessages, (msg, callback) => {

            Promise.resolve()
                .then(() => this.replyPush(chatId, [msg]))
                .then(() => this.sleep(this._sendMessageInterval))
                .then(() => callback())
                .catch(err => callback(err));

          }, (err) => {
            if (err) {
              this.logError(err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
    } else {
      return Promise.resolve();
    }
  }

  reply(replyToken, messages) {
    return new Promise((resolve, reject) => {
      request.post("https://api.line.me/v2/bot/message/reply", {
        forever: true,
        headers: {
          'Authorization': `Bearer ${this.botConfig.channelAccessToken}`
        },
        json: {
          replyToken: replyToken,
          messages: messages
        }
      }, (error, response, body) => {
        if (error) {
          this.logError('Error while sending message', error);
          reject(error);
          return;
        }

        if (response.statusCode !== 200) {
          this.logError('Error status code while sending message', body);
          reject(error);
          return;
        }

        this.log('Send message succeeded');
        resolve(body);
      });
    });
  }

  replyPush(receiverId, messages) {
    return new Promise((resolve, reject) => {
      request.post("https://api.line.me/v2/bot/message/push", {
        forever: true,
        headers: {
          'Authorization': `Bearer ${this.botConfig.channelAccessToken}`
        },
        json: {
          to: receiverId,
          messages: messages
        }
      }, (error, response, body) => {
        if (error) {
          this.logError('Error while sending message', error);
          reject(error);
          return;
        }

        if (response.statusCode !== 200) {
          this.logError('Error status code while sending message', body);
          reject(error);
          return;
        }

        this.log('Send message succeeded');
        resolve(body);
      });
    });
  }

  filterPlatformMessages(messages, platform) {
    if (messages) {
      let platformMessages = messages.filter(m => m.platform === platform);
      if (platformMessages.length === 0) {
        platformMessages = messages.filter(m => !this.isDefined(m.platform));
      }
      return platformMessages;
    } else {
      return [];
    }
  }

  sleep(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), delay);
    });
  }

  log() {
    let args = Array.prototype.slice.call(arguments);
    console.log.apply(console, args);
  }

  logError() {
    let args = Array.prototype.slice.call(arguments);
    console.error.apply(console, args);
  }

  isDefined(obj) {
    if (typeof obj === 'undefined') {
      return false;
    }

    if (!obj) {
      return false;
    }

    return obj !== null;
  }
};