/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var Request = require('./request').Request;
var util = require('util');

var ServerError = require('./exceptions').ServerError;

exports.JSONApiRequest = module.exports.JSONApiRequest = JSONApiRequest;

util.inherits(JSONApiRequest, Request);

function JSONApiRequest () {
    JSONApiRequest.super_.apply(this, arguments);
}

JSONApiRequest.prototype._handleResponse = function(response) {
    var self = this;

    var body = '';

    response.on('data', function(chunk) {
        body += chunk;
    });

    response.on('end', function() {
        if (response.statusCode >= 200 && response.statusCode <= 299) {
            try {
                    var json_body = JSON.parse(body);
                    self.emit('response', json_body);
                } catch (error) {
                    // JSON.parse can throw only one exception, SyntaxError
                    // All another exceptions throwing from user function,
                    // because it just rethrowing for better error handling.

                    if (error instanceof SyntaxError) {
                        self.emit('error', error);
                    } else {
                        throw error;
                    }
                }
        } else {
            var error = new ServerError(response.statusCode, body, 'Wrong response status code.');
            self.emit('error', error);
        }
    });
};
