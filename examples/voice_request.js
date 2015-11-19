/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

var fs = require("fs");
var apiai = require("../module/apiai");

var app = apiai("3921dd71224b4a888e18ff2815f3750e", "dd4f3798-58c8-45fd-8074-ecc8cfe0635f", {
    language: 'ru'
});

var request = app.voiceRequest();

// request.language = 'ru';

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

fs.readFile("rus_example.wav", function(error, buffer) {
    if (error) {
        console.log(error);
    } else {
        request.write(buffer);
    }

    request.end();
});
