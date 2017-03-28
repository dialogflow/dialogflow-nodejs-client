/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var http = require('http');
// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN");

var code = 405;

var server = http.createServer(function(request, response) {
    if (request.method == 'POST' && request.url == '/upload') {
        var voiceRequest = app.voiceRequest();

        voiceRequest.on('response', function(_response) {
            response.end(JSON.stringify(_response));
        });

        voiceRequest.on('error', function(error) {
            console.log(error);
            response.end();
        });

        request.on('data', function(chunk) {
            voiceRequest.write(chunk);
        });

        request.on('end', function() {
            voiceRequest.end();
        });
    } else {
        response.writeHead(code, {});
        response.end();
    }

    console.log(request.headers);
});

server.listen(8000);

// cat ann_smith.wav | curl -v -X POST --data-binary @- -H "Transfer-Encoding: chunked" -H "Content-Type: audio/wav" http://localhost:8000/upload
