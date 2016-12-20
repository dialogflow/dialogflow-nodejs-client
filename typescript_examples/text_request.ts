/// <reference path="./../index.d.ts" />

"use strict";

import * as apiai from "../";

const app = apiai("YOUR_ACCESS_TOKEN");

let request = app.textRequest("Hello", {sessionId: "UNIQUE_SESSION_ID"});

request.on("response", function (response) {
    console.log("response: " + JSON.stringify(response, null, "  "));
});

request.on("error", function(error) {
    console.log("error: " + error);
});

request.end();
