/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

// var apiai = require("../module/apiai");
var apiai = require("apiai")

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
                ]

var request = app.textRequest('Hello ori', {'entities': entities});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end()
