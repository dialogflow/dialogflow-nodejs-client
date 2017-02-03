/// <reference path="./../index.d.ts" />
/// <reference types="node" />

"use strict";

import * as apiai from "../";
import * as fs from "fs";

const app = apiai("YOUR_ACCESS_TOKEN");

let file = fs.createWriteStream("hello-world-tts.wav");

file.on("finish", function() {
    console.log("wav file ready");
});

file.on("error", function(err) {
    console.log(err);
});

let request = app.ttsRequest("Hello world", {writeStream: file});

request.end();
