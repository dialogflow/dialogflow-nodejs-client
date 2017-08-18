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
 
'use strict';

var util = require('util');
// var apiai = require("../module/apiai");
var apiai = require("apiai");

var options = {
    // hostname: 'eap.api.ai',
};

var app = apiai("<YOUR_ACCESS_TOKEN>", options);

var event = {
    name: "network.connect",
    data: {
        param1: "param1 value",
    }
};

var options = {
    sessionId: '<UNIQE SESSION ID>'
};

var request = app.eventRequest(event, options);

request.on('response', function(response) {
    console.log(util.inspect(response, false, null));
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
