/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/// <reference path="./../index.d.ts" />

"use strict";

import * as apiai from "../";

const app = apiai("YOUR_ACCESS_TOKEN");

const sessionId = "UNIQUE_SESSION_ID";

let user_entities_request = app.userEntitiesRequest({
    sessionId: sessionId,
    entities: [
        {
            name: "Application",
            extend: false,
            entries: [
                {
                    value: "Firefox",
                    synonyms: ["Firefox", "fox"]
                },
                {
                    value: "XCode",
                    synonyms: ["XCode", "xcode"]
                }
            ]
        }
    ]
});

user_entities_request.on("response", function (response) {
    let text_request = app.textRequest("Open XCode", {sessionId: sessionId});

    text_request.on("response", function (response) {
        console.log("response: " + JSON.stringify(response, null, "  "));
    });

    text_request.on("error", function (error) {
        console.log("error: " + JSON.stringify(error, null, "  "));
    });

    text_request.end();
});

user_entities_request.on("error", function(error) {
    console.log("error: " + JSON.stringify(error, null, "  "));
});

user_entities_request.end();
