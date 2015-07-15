# api-ai-node-js
Node.js SDK for Api.ai

Plugin makes it easy to integrate your Node.js application with [api.ai](http://api.ai) natural language processing service.

* [Installation](#installation)
* [Usage](#usage)

# Installation

* Make sure that [Node.js](https://nodejs.org/) installed.
* Install Node.js library with `npm`:
```shell
npm install apiai-nodejs
```

# Usage
* Create `main.js` file. Insert into following code.
```javascript
var apiai = require('apiai');

var app = apiai("<your client acces token>", "<your client subscribtion key>");

var request = app.textRequest('<Your text query>');

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end()
```
* Run following command.
```shell
node main.js
```
* Your can find more examples in [`examples`](examples) directiry.