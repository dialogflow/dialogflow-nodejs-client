/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
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

