/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * MIT Licensed
 */

var http = require("https");
var fs = require("fs");

var apiai = require("./module/apiai");

var app = apiai("3485a96fb27744db83e78b8c4bc9e7b7", "cb9693af-85ce-4fbf-844a-5563722fc27f");

//////////////////////////////////////////////
//////////////////////////////////////////////

// var entities = [
//                     {
//                         name: "dwarfs",
//                         entries: [
//                                     {
//                                         value: "Ori",
//                                         synonyms: [
//                                                     "ori",
//                                                     "Nori"
//                                                     ]
//                                     },
//                                     {
//                                         value: "bifur",
//                                         synonyms: [
//                                                     "Bofur",
//                                                     "Bombur"
//                                                     ]
//                                     }
//                                 ]
//                     }
//                 ]

// var q = app.textRequest('Hello ori', {'entities': entities})

// q.on('response', function(response) {
//     console.log(response);
// });

// q.end()

//////////////////////////////////////////////
//////////////////////////////////////////////

var q = app.voiceRequest();
q.on('response', function(response) {
    console.log(response);
});

q.on('error', function(error) {
    console.log(error);
});

fs.readFile("ann_smith.wav", function(error, buffer) {
    if (error) {
        console.log(error);
    } else {
        q.write(buffer);
        q.end();
    }
});



// var request = new Request()

// request.on('response', function(response) {
//     console.log(response);
// });

// console.dir({request: request});

// request.end();

// var json = {

// };

// var body = JSON.stringify(json);

// var options = {
//     hostname: 'api.api.ai',
//     path: '/v1/query',
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Bearer ' + '417a7fbdda844ac1ae922d10d4c4e4be',
//         'ocp-apim-subscription-key': '6123ebe7185a4d9e94e441b7959cf2bc',
//         'Content-Type': 'application/json',
//         'Transfer-Encoding': 'chunked',
//         // 'Content-Length': body.length,
//     }
// }

// var request = http.request(options, function(response) {
//     var body = '';

//     response.on('data', function(chunk) {
//         body += chunk;
//     });

//     response.on('end', function() {
//         console.log(body);
//     });
// });

// request.on('error', function(error) {
//     console.log(error);
// });

// request.write(body);
// request.end();










// console.log(client);

// var server = http.createServer(function (request, response) {
//     responseHeaders = {
//         "Content-Type": "text/html"
//     }

//     response.writeHead(200, responseHeaders);

//     request.on("data", function(chunk) {
//         response.write(chunk.toString().toUpperCase());
//     });

//     request.on("end", function() {
//         response.end();
//     });
// })

// server.listen(8000);



// function A() {

// };

// A.prototype.foo = function() {
//     console.log('foo A')
// };

// function B() {
//     A.call(this);
// };

// B.prototype = Object.create(A.prototype);

// B.prototype.foo = function() {
//     A.prototype.foo.apply(this);
//     console.log('foo B');
// };

// var b = new B()

// b.foo();
