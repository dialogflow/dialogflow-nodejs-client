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

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN");

var options = {
    sessionId: '<UNIQUE SESSION ID>',
    contexts: [
        {
            name: 'context_number_one',
            parameters: {
                'some_parameter_of_context': 'parameter value 1'
            }
        }
    ]
};

var request = app.textRequest('Hello', options);

request.on('response', function(response) {
    console.log(JSON.stringify(response, null, '  '));
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
