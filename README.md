# Node.js SDK for Api.ai

This plugin allows integrating agents from the [Api.ai](http://api.ai) natural language processing service with your Node.js application.

* [Installation](#installation)
* [Usage](#usage)

# Installation

* Install [Node.js](https://nodejs.org/)
* Install Api.ai SDK with `npm`:
```shell
npm install apiai
```

# Usage
* Create `main.js` file with the following code:
```javascript
var apiai = require('apiai');

var app = apiai("<your client access token>");

var request = app.textRequest('<Your text query>');

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end()
```
# Intents Requests
* Make requests to the intents endpoint
```javascript
// get the data for a particular intent and add some learning to it
var request = app.intentsRequest({method: "GET", intentId: intentId});
request.on('response', function(intentData) {
      intentData.userSays.push({data: [{ text: "i want you to learn to speak chinese" }]});
      var putRequest = app.intentsRequest({method: "PUT", intentId: intentId, intent: intentData});
      putRequest.end();
});
request.done();
```
* Run following command.
```shell
node main.js
```
* Your can find more examples in [`examples`](examples) directory.
