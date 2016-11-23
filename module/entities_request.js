/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var Request = require('./request').Request;
var util = require('util');

exports.EntitiesRequest = module.exports.EntitiesRequest = EntitiesRequest;

util.inherits(EntitiesRequest, Request);

function EntitiesRequest(application, entities, options) {
    var self = this;

    self.entities = entities;

    EntitiesRequest.super_.apply(this, [application, options]);
}

EntitiesRequest.prototype._headers = function() {
    var headers = EntitiesRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

EntitiesRequest.prototype._requestOptions = function() {
    var request_options = EntitiesRequest.super_.prototype._requestOptions.apply(this, arguments);

    request_options.path = this.endpoint + 'entities';
    request_options.method = 'PUT';

    return request_options;
};

EntitiesRequest.prototype.end = function() {
    var self = this;

    self.write(JSON.stringify(self.entities));
    
    EntitiesRequest.super_.prototype.end.apply(this, arguments);
};
