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

exports.VoiceRequest = module.exports.VoiceRequest = VoiceRequest;

var CRLF = '\r\n';

util.inherits(VoiceRequest, QueryRequest);

function VoiceRequest (application, options) {
    var self = this;
    self.boundary = self._generateBoundary();

    VoiceRequest.super_.apply(this, [application, options]);

    self._sendMetaData();
}

VoiceRequest.prototype._generateBoundary = function() {
    return (new Date()).getTime().toString();
};

VoiceRequest.prototype._headers = function() {
    var self = this;

    var headers = VoiceRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'multipart/form-data; boundary=' + self.boundary;
    headers['Transfer-Encoding'] = 'chunked';

    return headers;
};

VoiceRequest.prototype._sendMetaData = function() {
    var self = this;

    var data = '--' + self.boundary + CRLF;
    data += 'Content-Disposition: form-data; name="request"' + CRLF;
    data += "Content-Type: application/json" + CRLF + CRLF;

    data += JSON.stringify(self._jsonRequestParameters());

    data += CRLF + '--' + self.boundary + CRLF;
    data += 'Content-Disposition: form-data; name="voiceData"' + CRLF;
    data += 'Content-Type: audio/wav' + CRLF + CRLF;

    self.write(data);
};

VoiceRequest.prototype.end = function() {
    var self = this;

    var lastDataChunk = CRLF + '--' + self.boundary + '--' + CRLF;

    self.write(lastDataChunk);

    VoiceRequest.super_.prototype.end.apply(this, arguments);
};
