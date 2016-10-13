/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var https = require('https');
var http = require('http');

var ServerError = require('./exceptions').ServerError;

exports.Request = module.exports.Request = Request;

util.inherits(Request, EventEmitter);

function Request (application, options) {
    var self = this;

    self.clientAccessToken = application.clientAccessToken;

    self.hostname = application.hostname;

    self.endpoint = options.endpoint;
    self.requestSource = application.requestSource;

    var _http = application.secure ? https : http;

    var requestOptions = self._requestOptions();

    requestOptions.agent = application._agent;

    var request = _http.request(requestOptions, function(response) {
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
    });

    request.on('error', function(error) {
        self.emit('error', error);
    });

    self.request = request;
}

Request.prototype._headers = function() {
    var self = this;

    return {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + self.clientAccessToken,
        'api-request-source': self.requestSource
    };
};

Request.prototype._requestOptions = function() {
    var self = this;

    return {
        hostname: self.hostname,
        headers: self._headers()
    };
};

Request.prototype.write = function(chunk) {
    this.request.write(chunk);
};

Request.prototype.end = function() {
    this.request.end();
};
