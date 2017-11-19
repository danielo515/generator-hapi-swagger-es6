'use strict';

const Joi = require('joi');
const Config = require('getconfig');
const JWT = require('hapi-auth-jwt2');

const validation = (decoded, callback) => {

    if (!decoded.user.username) {
        callback(null, false); // JWT Validation failed
    }
    else {
        callback(null, true);  // JWT Validation ok
    }
};


exports.register = (server, options, next) => {

    server.register(JWT, (error) => {

        if (error) {
            throw (error);
        }
        else {

            server.auth.strategy('jwt', 'jwt', false, {
                key: Config.authKey,
                verifyOptions: {
                    algorithms: ['HS256']
                },
                validateFunc: validation
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'authentication'
};
