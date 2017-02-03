/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN");

var options = {
    sessionId: '<UNIQE SESSION ID>',
    contexts: [
        {
            name: 'context_number_one',
            parameters: {
                'some_parameter_of_context': 'parameter value 1'
            }
        }
    ]
};

var request = app.textRequest('Hello', options);

request.on('response', function(response) {
    console.log(JSON.stringify(response, null, '  '));
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
