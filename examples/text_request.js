/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * MIT Licensed
 */

// var apiai = require("../../apiai");
// var apiai = require("apiai");
// var apiai = require("../module/apiai");
var apiai = require("apiai")

var app = apiai("3485a96fb27744db83e78b8c4bc9e7b7", "cb9693af-85ce-4fbf-844a-5563722fc27f");

var request = app.textRequest('Hello');

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end()