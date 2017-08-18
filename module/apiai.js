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

/**
 * Module dependencies.
 * @private
 */

var https = require('https');
var http = require('http');

var ContextsRequest = require('./contexts_request').ContextsRequest;
var GetContextsRequest = require('./get_contexts_request').GetContextsRequest;
var DeleteContextsRequest = require('./delete_contexts_request').DeleteContextsRequest;
var TextRequest = require('./text_request').TextRequest;
var EventRequest = require('./event_request').EventRequest;
var VoiceRequest = require('./voice_request').VoiceRequest;
var UserEntitiesRequest = require('./user_entities_request').UserEntitiesRequest;
// Text to speech (TTS) has been deprecated
// var TTSRequest = require('./tts_request').TTSRequest;

/**
 * Module variables.
 * @private
 */

var version = '20150910';
var language = 'en';
var hostname = 'api.api.ai';
var endpoint = '/v1/';
var defaultSource = 'node';

/**
 * Module exports.
 * @public
 */

exports = module.exports = createApplication;

/**
 * Old version function for creation application instance.
 * @param  {string} clientAccessToken Access token. You can get it on https://api.ai
 * @param  {string} subscriptionKey   Subscribtion key. It has not been used anymore.
 * @param  {object} _options          Default option for apllication.
 * @return {Application}              [description]
 */
function createApplicationDeprecated(clientAccessToken, subscriptionKey, _options) {
    var options = _options || {};

    if (!clientAccessToken) {
        throw new Error('\'clientAccessToken\' cannot be empty.');
    }

    return new Application(clientAccessToken, options);
}

/**
 * New version function for creation application instance.
 * @param  {string} clientAccessToken Access token. You can get it on https://api.ai
 * @param  {string} subscriptionKey   Subscribtion key. It has not been used anymore.
 * @param  {object} _options          Default option for apllication.
 * @return {Application}              [description]
 */
function createApplicationNew(clientAccessToken, _options) {
    var options = _options || {};

    if (!clientAccessToken) {
        throw new Error('\'clientAccessToken\' cannot be empty.');
    }

    return new Application(clientAccessToken, options);
}

/**
 * Create an api.ai application.
 *
 * @param {*} args [description]
 * @return {Function}
 * @api public
 */
function createApplication() {
    if (arguments.length > 1) {
        if (typeof arguments[1] == "string") {
            return createApplicationDeprecated.apply(this, arguments);
        } else if (typeof arguments[1] == "object") {
            return createApplicationNew.apply(this, arguments);
        } else {
            throw new Error('Wrong parameters of initialization.');
        }
    } else {
        return createApplicationNew.apply(this, arguments);
    }
}

function Application (clientAccessToken, options) {
    var self = this;

    self.language = options.language || language;

    self.clientAccessToken = clientAccessToken;

    self.hostname = options.hostname || hostname;
    self.version = options.version || version;

    self.endpoint = options.endpoint || endpoint;
    self.requestSource = options.requestSource || defaultSource;

    if ('secure' in options) {
        self.secure = options.secure;
    } else {
        self.secure = true;
    }

    var _http = self.secure ? https : http;
    self._agent = new _http.Agent({ keepAlive: true });
}

Application.prototype.contextsRequest = function(contexts, options) {
    var self = this;

    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    return new ContextsRequest(self, contexts, opt);
};

/**
 * Get all/one contexts for session by ID.
 * @param  {object} options Options for GetContextsRequest. Should contain sessionId.
 * @param  {string} [context] Name of the context to retreive or empty/null to get all contexts.
 * @return {ContextsRequest}           Returns a ContextsRequest object.
 */
Application.prototype.getContextsRequest = function(options, context) {
    var self = this;

    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    return new GetContextsRequest(self, opt, context);
}

/**
 * Delete/Reset all contexts for session by ID.
 * @param  {object} options Options for DeleteContextsRequest. Should contain sessionId.
 * @param  {string} [context] Name of the context to delete or empty/null to delete all contexts.
 * @return {ContextsRequest}           Returns a ContextsRequest object.
 */
Application.prototype.deleteContextsRequest = function(options, context) {
    var self = this;

    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    return new DeleteContextsRequest(self, opt, context);
}

/**
 * [textRequest description]
 * @param  {[type]} query   [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
Application.prototype.textRequest = function(query, options) {
    var self = this;
    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    if (!('version' in opt)) {
        opt.version = self.version;
    }

    return new TextRequest(self, query, opt);
};

Application.prototype.eventRequest = function(event, options) {
    var self = this;
    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    if (!('version' in opt)) {
        opt.version = self.version;
    }

    return new EventRequest(self, event, opt);
};

/**
 * Make voice request object.
 * @param  {object} [options={}] Optionos for voice request.
 * @param  {string} [options.endpoint] [description]
 * @param  {string} [options.version] [description]
 * @return {VoiceRequest}         [description]
 * @deprecated since version 2.0
 */
Application.prototype.voiceRequest = function(options) {
    var self = this;
    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    if (!('version' in opt)) {
        opt.version = self.version;
    }

    return new VoiceRequest(self, opt);
};

/**
 * [userEntitiesRequest description]
 * @param  {[type]} user_entities_body  [description]
 * @param  {[type]} options             [description]
 * @return {[type]}                     [description]
 */
Application.prototype.userEntitiesRequest = function(user_entities_body, options) {
    var self = this;
    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    return new UserEntitiesRequest(self, user_entities_body, opt);
};

// Text to speech (TTS) has been deprecated
// Application.prototype.ttsRequest = function(text, options) {
//     var self = this;
//     var opt = options || {};

//     if (!('endpoint' in opt)) {
//         opt.endpoint = self.endpoint;
//     }

//     return new TTSRequest(self, text, opt);
// };
