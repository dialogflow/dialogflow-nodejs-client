/// <reference path="./../index.d.ts" />

"use strict";

import * as apiai from "../";

// const app = apiai("YOUR_ACCESS_TOKEN")
const app = apiai("0830dba9f96649bf967bdaf853aa9c9f")

// var request = app.textRequest("Hello", {sessionId: 'UNIQUE_SESSION_ID'})

// request.on('response', function (response) {
//     console.log('response: ' + JSON.stringify(response, null, '  '));
// });

// request.on('error', function(error) {
//     console.log('error: ' + error);
// });

// request.end();

const sessionId = 'UNIQUE_SESSION_ID'

var user_entities_request = app.userEntitiesRequest([
    {
        name: 'Application',
        sessionId: sessionId,
        extend: false,
        entries: [
            {
                value: 'Firefox',
                synonyms:['Firefox', 'fox']
            },
            {
                value: 'XCode',
                synonyms:['XCode', 'xcode']
            }
        ]
    }
]);

user_entities_request.on('response', function (response) {
    var text_request = app.textRequest("Open XCode", {sessionId: sessionId})

    text_request.on('response', function (response) {
        console.log('response: ' + JSON.stringify(response, null, '  '));
    });

    text_request.on('error', function (error) {
        console.log('error: ' + JSON.stringify(error, null, '  '));
    });

    text_request.end();
});

user_entities_request.on('error', function(error) {
    console.log('error: ' + JSON.stringify(error, null, '  '));
});

user_entities_request.end();
