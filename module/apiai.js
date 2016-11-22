/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var util = require('util');
var https = require('https');
var http = require('http');

var ContextsRequest = require('./contexts_request').ContextsRequest;
var TextRequest = require('./text_request').TextRequest;
var EventRequest = require('./event_request').EventRequest;
var VoiceRequest = require('./voice_request').VoiceRequest;
var UserEntitiesRequest = require('./user_entities_request').UserEntitiesRequest;

var version = '20150910';
var language = 'en';
var hostname = 'api.api.ai';
var endpoint = '/v1/';
var defaultSource = 'node';

function createApplicationDeprecated(clientAccessToken, subscriptionKey, options) {
    var options = options || {};

    if (!clientAccessToken) {
        throw new Error('\'clientAccessToken\' cannot be empty.');
    }

    return new Application(clientAccessToken, options);
}

function createApplicationNew(clientAccessToken, options) {
    var options = options || {};

    if (!clientAccessToken) {
        throw new Error('\'clientAccessToken\' cannot be empty.');
    }

    return new Application(clientAccessToken, options);
}

function createApplication(args) {
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

exports = module.exports = createApplication;

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
};

Application.prototype.contextsRequest = function(contexts, options) {
    var self = this;
    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    return new ContextsRequest(self, contexts, opt);
};

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
}

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

Application.prototype.userEntitiesRequest = function(user_entities, options) {
    var self = this;
    var opt = options || {};

    if (!('endpoint' in opt)) {
        opt.endpoint = self.endpoint;
    }

    return new UserEntitiesRequest(self, user_entities, opt);
};
