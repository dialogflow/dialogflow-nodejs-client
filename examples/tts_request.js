/* tts_request example */

'use strict';

// var apiai = require("../module/apiai");
var fs = require("fs");
var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN");


var file = fs.createWriteStream('hello-world-tts.wav');

file.on('finish',function() {
    console.log('wav file ready');
});

file.on('error', function(err) {
    console.log(err);
});

var tts_request_options = {
    lang: 'en-US',
    writeStream: file
};

var tts_request = app.ttsRequest('Hello world!', tts_request_options);

tts_request.end();
