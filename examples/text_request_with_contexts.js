/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var apiai = require("../module/apiai");
// var apiai = require("apiai");

var app = apiai("949362b4c9dc4c14a6e05225c88e1fd5");

var options = {
    sessionId: '123',
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
