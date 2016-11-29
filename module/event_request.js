/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
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
};

EventRequest.prototype._headers = function() {
    var headers = EventRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

EventRequest.prototype._jsonRequestParameters = function() {
    var self = this;

    var json = EventRequest.super_.prototype._jsonRequestParameters.apply(this, arguments);

    json['event'] = self.event;

    return json;
};

EventRequest.prototype.end = function() {
    var self = this;

    self.write(JSON.stringify(self._jsonRequestParameters()));

    EventRequest.super_.prototype.end.apply(this, arguments);
};
