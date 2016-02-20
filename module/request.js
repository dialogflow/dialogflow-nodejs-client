/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var http = require('https');

exports.Request = module.exports.Request = Request;

util.inherits(Request, EventEmitter);

function Request (application, options) {
    var self = this;

    self.clientAccessToken = application.clientAccessToken;
    self.subscriptionKey = application.subscriptionKey;

    self.language = application.language;
    self.hostname = application.hostname;
    self.path = application.path;
    self.timezone = application.timezone;

    if ('resetContexts' in options) {
        self.resetContexts = options.resetContexts;
    }

    if ('contexts' in options) {
        self.contexts = options.contexts;
    }

    if ('entities' in options) {
        self.entities = options.entities;
    }

    if ('sessionId' in options) {
        self.sessionId = options.sessionId;
    }

    if ('version' in options) {
        self.version = options.version
    }

    var requestOptions = self._requestOptions();

    var request = http.request(requestOptions, function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            try {
                self.emit('response', JSON.parse(body));
            } catch(error) {
                self.emit('error', error);
            }
        });
    });

    request.on('error', function(error) {
        self.emit('error', error);
    });

    self.request = request;
}

Request.prototype._headers = function() {
    var self = this;

    return {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + self.clientAccessToken,
        'ocp-apim-subscription-key': self.subscriptionKey,
    };
};

Request.prototype._requestOptions = function() {
    var self = this;

    var fullPath = self.path
    
    if (self.hasOwnProperty("version")) {

        fullPath += '?v=' + self.version
    }

    return {
        hostname: self.hostname,
        path: fullPath,
        method: 'POST',
        headers: self._headers()
    };
};

Request.prototype._jsonRequestParameters = function() {
    var self = this;
    
    var json = {
        'lang': self.language,
        'timezone': self.timezone
    };

    if ('resetContexts' in self) {
        json['resetContexts'] = self.resetContexts;
    }

    if ('contexts' in self) {
        json['contexts'] = self.contexts;
    }

    if ('entities' in self) {
        json['entities'] = self.entities;
    }

    if ('sessionId' in self) {
        json['sessionId'] = self.sessionId;
    }

    return json;
};

Request.prototype.write = function(chunk) {
    this.request.write(chunk);
};

Request.prototype.end = function() {
    this.request.end();
};
