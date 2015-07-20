/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

// var apiai = require("../../apiai");
// var apiai = require("apiai");
// var apiai = require("../module/apiai");
var apiai = require("apiai")

var app = apiai("ACCESS_TOKEN", "SUBSCRIPTION_KEY");

var request = app.textRequest('Hello');

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end()
