/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

    var buffers = [];
    var bufferLength = 0;

    response.on('data', function(chunk) {
      bufferLength += chunk.length;
      buffers.push(chunk);
    });

    response.on('end', function() {
        if (bufferLength) {
            body = Buffer.concat(buffers, bufferLength).toString('utf8');
        }

        buffers = [];
        bufferLength = 0;

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
