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

var JSONApiRequest = require('./json_api_request').JSONApiRequest;
var util = require('util');

exports.QueryRequest = module.exports.QueryRequest = QueryRequest;

util.inherits(QueryRequest, JSONApiRequest);

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
    } else {
        throw Error(
            'Now \'sessionId\' is required parameter. Please add this parameter to \'options\' of request.\n' +
            'Like following example:\n' +
            '> var app = ...\n' +
            '> request = app.textRequest("Hello", {sessionId: "UNIQUE_SESSION_ID"})\n' +
            '> ... \n'
        );
    }

    if ('version' in options) {
        self.version = options.version;
    }

    if ('requestSource' in application) {
        self.requestSource = application.requestSource;
    }

    if ('originalRequest' in options) {
        self.originalRequest = options.originalRequest;
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

    request_options.path = self.endpoint + path;
    request_options.method = 'POST';

    return request_options;
};

QueryRequest.prototype._jsonRequestParameters = function() {
    var self = this;

    var json = {
        'lang': self.language,
        'timezone': self.timezone
    };

    if ('resetContexts' in self) {
        json.resetContexts = self.resetContexts;
    }

    if ('contexts' in self) {
        json.contexts = self.contexts;
    }

    if ('entities' in self) {
        json.entities = self.entities;
    }

    if ('sessionId' in self) {
        json.sessionId = self.sessionId;
    }

    if ('originalRequest' in self) {
        json.originalRequest = self.originalRequest;
    }

    return json;
};
