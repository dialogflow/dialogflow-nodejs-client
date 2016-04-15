/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var http = require('https');

exports.Request = module.exports.Request = Request;

util.inherits(Request, EventEmitter);

function Request (application, options) {
    var self = this;

    self.clientAccessToken = application.clientAccessToken;

    self.hostname = application.hostname;

    self.endpoint = options.endpoint;

    var requestOptions = self._requestOptions();

    var request = http.request(requestOptions, function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            try {
                self.emit('response', JSON.parse(body));
            } catch (error) {
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
