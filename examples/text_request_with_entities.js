/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("ACCESS_TOKEN");

var entities = [
                    {
                        name: "dwarfs",
                        entries: [
                                    {
                                        value: "Ori",
                                        synonyms: [
                                                    "ori",
                                                    "Nori"
                                                    ]
                                    },
                                    {
                                        value: "bifur",
                                        synonyms: [
                                                    "Bofur",
                                                    "Bombur"
                                                    ]
                                    }
                                ]
                    }
                ];

var options = {
    entities: entities,
    sessionId: '<UNIQE SESSION ID>'
};

var request = app.textRequest('Hello ori', options);

request.on('response', function(response) {

    console.log(JSON.stringify(response, null, 4));
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
