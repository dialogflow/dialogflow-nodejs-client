/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

var fs = require("fs");

// var apiai = require("../module/apiai");
var apiai = require("apiai");

// var app = apiai("YOUR_ACCESS_TOKEN", "YOUR_SUBSCRIPTION_KEY");

var app = apiai("YOUR_ACCESS_TOKEN", "YOUR_SUBSCRIPTION_KEY", {
    language: 'ru'
});

var request = app.voiceRequest();

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
