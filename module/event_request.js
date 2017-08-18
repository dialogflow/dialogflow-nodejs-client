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

var QueryRequest = require('./query_request').QueryRequest;
var util = require('util');

exports.EventRequest = module.exports.EventRequest = EventRequest;

util.inherits(EventRequest, QueryRequest);

function EventRequest(application, event, options) {
    EventRequest.super_.apply(this, [application, options]);

    var self = this;
    self.event = event;
}

EventRequest.prototype._headers = function() {
    var headers = EventRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

EventRequest.prototype._jsonRequestParameters = function() {
    var self = this;

    var json = EventRequest.super_.prototype._jsonRequestParameters.apply(this, arguments);

    json.event = self.event;

    return json;
};

EventRequest.prototype.end = function() {
    var self = this;

    self.write(JSON.stringify(self._jsonRequestParameters()));

    EventRequest.super_.prototype.end.apply(this, arguments);
};
