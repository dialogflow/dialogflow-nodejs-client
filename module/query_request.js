/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var Request = require('./request').Request;
var util = require('util');

exports.QueryRequest = module.exports.QueryRequest = QueryRequest;

util.inherits(QueryRequest, Request);

function QueryRequest (application, options) {
    var self = this;

    self.language = application.language;

    if ('timezone' in options) {
        self.timezone = options.timezone;
    }  
  
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
        self.version = options.version;
    }

    QueryRequest.super_.apply(this, arguments);
}

QueryRequest.prototype._requestOptions = function() {
    var self = this;

    var path = 'query';
    
    if (self.hasOwnProperty("version")) {
        path += '?v=' + self.version;
    }

    var request_options = QueryRequest.super_.prototype._requestOptions.apply(this, arguments);

    request_options['path'] = self.endpoint + path;
    request_options['method'] = 'POST';

    return request_options
};

QueryRequest.prototype._jsonRequestParameters = function() {
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
