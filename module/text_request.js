/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var QueryRequest = require('./query_request').QueryRequest;
var util = require('util');

exports.TextRequest = module.exports.TextRequest = TextRequest;

util.inherits(TextRequest, QueryRequest);

function TextRequest (application, query, options) {
    TextRequest.super_.apply(this, [application, options]);

    var self = this;
    self.query = query;
}

TextRequest.prototype._headers = function() {
    var headers = TextRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

TextRequest.prototype._jsonRequestParameters = function() {
    var self = this;

    var json = TextRequest.super_.prototype._jsonRequestParameters.apply(this, arguments);

    json['query'] = self.query;

    return json;
};

TextRequest.prototype.end = function() {
    var self = this;

    self.write(JSON.stringify(self._jsonRequestParameters()));

    TextRequest.super_.prototype.end.apply(this, arguments);
};
