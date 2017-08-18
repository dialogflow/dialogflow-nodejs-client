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

// Text to speech (TTS) has been deprecated

// 'use strict';

// var Request = require('./request').Request;
// var util = require('util');

// exports.TTSRequest = module.exports.TTSRequest = TTSRequest;

// util.inherits(TTSRequest, Request);

// function TTSRequest(application, text, options) {
//     var self = this;

//     self.text = text;

//     self.language = options.language || options.lang || 'en-US';

//     if('writeStream' in options){
//         self.writeStream = options.writeStream;
//     } else {
//         throw new Error('\'writeStream\' cannot be empty.');
//     }

//     TTSRequest.super_.apply(this, [application, options]);
// }

// TTSRequest.prototype._headers = function() {
//     var self = this;
//     var headers = TTSRequest.super_.prototype._headers.apply(this, arguments);

//     headers['Accept-Language'] = self.language;

//     return headers;
// };

// TTSRequest.prototype._requestOptions = function() {
//     var self = this;
//     var request_options = TTSRequest.super_.prototype._requestOptions.apply(this, arguments);

//     request_options.path = self.endpoint + 'tts?text=' + encodeURI(self.text);
//     request_options.method = 'GET';

//     return request_options;
// };

// TTSRequest.prototype._handleResponse = function(response) {
//     var self = this;
//     response.pipe(self.writeStream);
// };

