/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
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
