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

exports.DeleteContextsRequest = module.exports.DeleteContextsRequest = DeleteContextsRequest;

util.inherits(DeleteContextsRequest, JSONApiRequest);

function DeleteContextsRequest(application, options, context) {
    var self = this;

    if (context) {
      self.context = context;
    }
    self.sessionId = options.sessionId;

    DeleteContextsRequest.super_.apply(this, [application, options]);
}

DeleteContextsRequest.prototype._headers = function() {
    var headers = DeleteContextsRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

DeleteContextsRequest.prototype._requestOptions = function() {
    var request_options = DeleteContextsRequest.super_.prototype._requestOptions.apply(this, arguments);
    var contextPath = this.context ? '/' + context : '';

    request_options.path = this.endpoint + 'contexts' + contextPath + '?sessionId=' + this.sessionId;
    request_options.method = 'DELETE';

    return request_options;
};
