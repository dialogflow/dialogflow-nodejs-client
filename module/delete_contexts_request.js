/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
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
    var contextPath = this.context ? '/' + this.context : '';

    request_options.path = this.endpoint + 'contexts' + contextPath + '?sessionId=' + this.sessionId;
    request_options.method = 'DELETE';

    return request_options;
};
