/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var JSONApiRequest = require('./json_api_request').JSONApiRequest;
var util = require('util');

exports.UserEntitiesRequest = module.exports.UserEntitiesRequest = UserEntitiesRequest;

util.inherits(UserEntitiesRequest, JSONApiRequest);

function UserEntitiesRequest(application, user_entities_body, options) {
    var self = this;

    self.user_entities_body = user_entities_body;

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

    if (
        (!('user_entities_body' in self)) ||
        (!('entities' in self.user_entities_body))
       )
    {
        throw Error(
            'Data format for user untities request was changed. \n' +
            'See details: https://docs.api.ai/docs/userentities \n' +
            '...or see examples.'
        );
    }

    self.write(JSON.stringify(self.user_entities_body));

    UserEntitiesRequest.super_.prototype.end.apply(this, arguments);
};
