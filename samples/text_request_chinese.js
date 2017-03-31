/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN", {
    language: 'zh-CN'
});

var options = {
    sessionId: '<UNIQE SESSION ID>'
};

var request = app.textRequest('什么叫发票', options);

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
