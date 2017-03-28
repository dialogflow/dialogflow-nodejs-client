/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var util = require('util');
// var apiai = require("../module/apiai");
var apiai = require("apiai");

var options = {
    // hostname: 'eap.api.ai',
};

var app = apiai("<YOUR_ACCESS_TOKEN>", options);

var event = {
    name: "network.connect",
    data: {
        param1: "param1 value",
    }
};

var options = {
    sessionId: '<UNIQE SESSION ID>'
};

var request = app.eventRequest(event, options);

request.on('response', function(response) {
    console.log(util.inspect(response, false, null));
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
