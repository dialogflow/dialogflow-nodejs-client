/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
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