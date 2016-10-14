/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var util = require('util');

exports.ServerError = module.exports.ServerError = ServerError;

util.inherits(ServerError, Error);

function ServerError (statusCode, responseBody, message) {
    var self = this;

    Error.captureStackTrace(this, ServerError);

    self.statusCode = statusCode;
    self.responseBody = responseBody;

    this.name = this.constructor.name;
    this.message = message;

    ServerError.super_.apply(this, []);
}
