/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var JSONApiRequest = require('./json_api_request').JSONApiRequest;
var util = require('util');

exports.GetContextsRequest = module.exports.GetContextsRequest = GetContextsRequest;

util.inherits(GetContextsRequest, JSONApiRequest);

function GetContextsRequest(application, options, context) {
    var self = this;

    if (context) {
      self.context = context;
    }
    self.sessionId = options.sessionId;

    GetContextsRequest.super_.apply(this, [application, options]);
}

GetContextsRequest.prototype._headers = function() {
    var headers = GetContextsRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

GetContextsRequest.prototype._requestOptions = function() {
    var request_options = GetContextsRequest.super_.prototype._requestOptions.apply(this, arguments);
    var contextPath = this.context ? '/' + context : '';

    request_options.path = this.endpoint + 'contexts' + contextPath + '?sessionId=' + this.sessionId;
    request_options.method = 'GET';

    return request_options;
};
