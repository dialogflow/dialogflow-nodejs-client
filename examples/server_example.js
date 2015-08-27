/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

var http = require('http');
var apiai = require("../module/apiai");

var app = apiai("09604c7f91ce4cd8a4ede55eb5340b9d", "4c91a8e5-275f-4bf0-8f94-befa78ef92cd");

var server = http.createServer(function(request, response) {
    if (request.method = 'POST' && request.url == '/upload') {
        // var outStream = fs.createWriteStream('qwe.wav');
        var voiceRequest = app.voiceRequest();

        voiceRequest.on('response', function(_response) {
            response.end(JSON.stringify(_response));
            // var json = JSON.stringify({'resolvedQuery': _response['result']['resolvedQuery']})
            // response.end(json);
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
