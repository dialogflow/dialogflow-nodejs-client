/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var Request = require('./request').Request;
var util = require('util');

exports.UserEntitiesRequest = module.exports.UserEntitiesRequest = UserEntitiesRequest;

util.inherits(UserEntitiesRequest, Request);

function UserEntitiesRequest(application, user_entities, options) {
    var self = this;

    self.user_entities = user_entities;

    UserEntitiesRequest.super_.apply(this, [application, options]);
}

UserEntitiesRequest.prototype._headers = function() {
    var headers = UserEntitiesRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

UserEntitiesRequest.prototype._requestOptions = function() {
    var request_options = UserEntitiesRequest.super_.prototype._requestOptions.apply(this, arguments);

    request_options.path = this.endpoint + 'userEntities';
    request_options.method = 'POST';

    return request_options;
};

UserEntitiesRequest.prototype.end = function() {
    var self = this;

    self.write(JSON.stringify(self.user_entities));
    
    UserEntitiesRequest.super_.prototype.end.apply(this, arguments);
};
