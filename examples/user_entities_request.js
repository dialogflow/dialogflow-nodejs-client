/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

// var apiai = require("../module/apiai");
var apiai = require("apiai")

var app = apiai("YOUR_ACCESS_TOKEN", "YOUR_SUBSCRIPTION_KEY");

var user_entities = [{
    name: 'Application',
    extend: false,
    entries: [
        {
            value: 'Firefox',
            synonims: ['Firefox']
        },
        {
            value: 'XCode',
            synonims: ['XCode']
        }, 
        {
            value: 'Sublime Text',
            synonims: ['Sublime Text']
        }
    ]
}];

var user_entities_request = app.userEntitiesRequest(user_entities);

user_entities_request.on('response', function(response) {
    console.log('User entities response: ');
    console.log(response);

    var request = app.textRequest('Open application Firefox');

    request.on('response', function(response) {
        console.log('Query response: ');
        console.log(response);
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end()
});

user_entities_request.on('error', function(error) {
    console.log(error);
});

user_entities_request.end()