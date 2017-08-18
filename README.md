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