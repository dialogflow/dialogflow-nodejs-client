/* tts_request example */

'use strict';

//var apiai = require("../module/apiai");
var fs = require("fs");
var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN");


var sessionId = "Some unique sessionId for identify unique user";

var file = fs.createWriteStream('hello-world-tts.wav');
      
file.on('finish',()=>{ console.log('wav file ready') });
        
file.on('error',(err)=>{ console.log(err) });


var tts_request_options = {
    'lang':'en-US',  
    'writeStream':file
}

var tts_request = app.ttsRequest('Hello world!',tts_request_options);

tts_request.end();