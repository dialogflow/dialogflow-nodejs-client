/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var Request = require('./request').Request;
var util = require('util');

exports.IntentsRequest = module.exports.IntentsRequest = IntentsRequest;

util.inherits(IntentsRequest, Request);

function IntentsRequest(application, options) {
    this.options = options;

    IntentsRequest.super_.apply(this, [application, options]);
}

IntentsRequest.prototype._headers = function() {
    var headers = IntentsRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

IntentsRequest.prototype._requestOptions = function() {
    var request_options = IntentsRequest.super_.prototype._requestOptions.apply(this, arguments);

    var path = this.endpoint + 'intents';
    if( this.options.intentId ) {
        path = path + '/' + this.options.intentId;
    }
    request_options.path = path;
    request_options.method = this.options.method || 'GET';

    return request_options
};

IntentsRequest.prototype.end = function() {
    var self = this;

    if( this.options.intents && this.options.method == "POST" ) {
      self.write(JSON.stringify(self.options.intents));
    }
    if( this.options.intent && this.options.method == "PUT" || this.options.method == "POST") {
      self.write(JSON.stringify(self.options.intent));
    }
    
    IntentsRequest.super_.prototype.end.apply(this, arguments);
};
