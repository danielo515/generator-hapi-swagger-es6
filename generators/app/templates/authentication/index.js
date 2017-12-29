'use strict';

const HapiJWT = require('hapi-auth-jwt2');
const AuthKey = require('getConfig').server.authKey;

/**
 * This is the JSON Web Token validation function that is useful for decoding.
 *
 * @param {String} decoded
 * @param {Object} request
 * @param {Function} callback
 */
const validation = (decoded, request, callback) => {

    // If the decoding worked fine then the property username must exist.
    if (!decoded.user.username) {
        callback(null, false); // JWT Validation failed
    }
    else {
        callback(null, true);  // JWT Validation ok
    }
};

const register = (server, options, next) => {

    server.register(HapiJWT);

    server.auth.strategy('jwt', 'jwt', true,
        {
            key: AuthKey,
            validateFunc: validation,
            verifyOptions: { algorithms: ['HS256'] }
        });

    return next();
};

register.attributes = {
    name: 'auth-wrapper'
};

module.exports = register;
