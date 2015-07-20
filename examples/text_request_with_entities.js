/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

var apiai = require("../module/apiai");

var app = apiai("3485a96fb27744db83e78b8c4bc9e7b7", "cb9693af-85ce-4fbf-844a-5563722fc27f");

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