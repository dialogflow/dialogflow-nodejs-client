# DEPRECATED Node.js SDK for Api.ai

| Deprecated |
|-------|
| This Dialogflow client library and Dialogflow API V1 [have been deprecated and will be shut down on October 23th, 2019](https://blog.dialogflow.com/post/migrate-to-dialogflow-api-v2/). Please migrate to Dialogflow API V2 and the [v2 client library](https://cloud.google.com/dialogflow-enterprise/docs/reference/libraries/nodejs) |

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

var request = app.textRequest('<Your text query>', {
    sessionId: '<unique session id>'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
```
* Run following command.
```shell
node main.js
```
* Your can find more examples in [`samples`](samples) directory.

## How to make contributions?
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).

This is not an official Google product.
