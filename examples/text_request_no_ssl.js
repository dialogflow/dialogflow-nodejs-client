/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var options = {
    secure: false,
    hostname: 'openapi-dev',
    endpoint: '/api/'
};

var app = apiai("YOUR_ACCESS_TOKEN", options);

var request = app.textRequest('Hello');

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
