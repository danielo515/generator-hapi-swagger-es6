'use strict';

const HapiJWT = require('hapi-auth-jwt2');
const AuthKey = require('getConfig').server.authKey;

const validation = (decoded, callback) => {

    if (!decoded.user.username) {
        callback(null, false); // JWT Validation failed
    }
    else {
        callback(null, true);  // JWT Validation ok
    }
};

const register = function register(server, options, next) {

    server.register(HapiJWT);
    server.auth.strategy('jwt', 'jwt', false,
        {
            key: AuthKey,
            validateFunc: validation,
            verifyOptions: { algorithms: ['HS256'] }
        });

    server.auth.default('jwt');
    return next();
};

register.attributes = {
    name: 'auth-wrapper'
};

module.exports = register;
