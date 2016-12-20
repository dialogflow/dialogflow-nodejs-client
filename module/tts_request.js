
'use strict';

var Request = require('./request').Request;
var util = require('util');

exports.TTSRequest = module.exports.TTSRequest = TTSRequest;

util.inherits(TTSRequest, Request);

function TTSRequest(application, text, options) {
    var self = this;

    self.text = text;

    if ('lang' in options) {
        self.lang = options.lang;
    } 
    else{
        self.lang = 'en-US';
    } 

    if('writeStream' in options){
        self.writeStream = options.writeStream;
    }

    TTSRequest.super_.apply(this, [application, options]);
}

TTSRequest.prototype._headers = function() {
    var self = this;
    var headers = TTSRequest.super_.prototype._headers.apply(this, arguments);

    headers['Accept-Language'] = self.lang;

    return headers;
};

TTSRequest.prototype._requestOptions = function() {
    var self = this;
    var request_options = TTSRequest.super_.prototype._requestOptions.apply(this, arguments);

    request_options.path = this.endpoint + 'tts?text=' + encodeURI(self.text);
    console.log(request_options.path);
    request_options.method = 'GET';
    request_options.responseFormat = 'raw';
    request_options.writeStream = self.writeStream;

    return request_options;
};

TTSRequest.prototype.end = function() {
    var self = this;
    
    TTSRequest.super_.prototype.end.apply(this, arguments);
};
