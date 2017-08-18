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

exports.ContextsRequest = module.exports.ContextsRequest = ContextsRequest;

util.inherits(ContextsRequest, JSONApiRequest);

function ContextsRequest(application, contexts, options) {
    var self = this;

    self.contexts = contexts;
    self.sessionId = options.sessionId;

    ContextsRequest.super_.apply(this, [application, options]);
}

ContextsRequest.prototype._headers = function() {
    var headers = ContextsRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

ContextsRequest.prototype._requestOptions = function() {
    var request_options = ContextsRequest.super_.prototype._requestOptions.apply(this, arguments);

    request_options.path = this.endpoint + 'contexts?sessionId=' + this.sessionId;
    request_options.method = 'POST';

    return request_options;
};

ContextsRequest.prototype.end = function() {
    var self = this;

    self.write(JSON.stringify(self.contexts));

    ContextsRequest.super_.prototype.end.apply(this, arguments);
};