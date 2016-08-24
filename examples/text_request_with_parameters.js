/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("138c6f0337a34cfa8022c9aa29ade48a");

var options = {
    sessionId: '<UNIQE SESSION ID>'
}

var request = app.textRequest('Hello', options);

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
