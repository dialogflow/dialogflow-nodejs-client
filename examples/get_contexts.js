/*!
 * apiai
 * Copyright(c) 2017 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN");

var options = {
    sessionId: '<UNIQE SESSION ID>'
};

var request = app.getContextsRequest(options);

request.on('response', function(response) {
    // response = [
    // { name: "contextName" }
    // ]
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();

var requestSingle = app.getContextsRequest(options, 'contextName');

requestSingle.on('response', function(response) {
    console.log(response);
});

requestSingle.on('error', function(error) {
    console.log(error);
});

request.end();
