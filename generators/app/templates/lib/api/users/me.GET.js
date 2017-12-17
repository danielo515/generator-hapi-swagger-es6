'use strict';

const Joi = require('joi');


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/users/me',
        config: {
            auth: 'jwt',
            description: 'Get the current user information details - [ Authentication required ]',
            validate: {
                headers:
                    Joi.object().keys({
                        'authorization': Joi.string().required().description('Authorization header must contain a valid JSON Web Token')
                    })
                        .options({
                            allowUnknown: true // Allow the rest of the headers
                        })
            },
            tags: ['meta', 'users', 'api'],
            handler(request, reply) {

                // The credentials of the authenticated user are stored in the property auth of the request object
                return reply(request.auth.credentials);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'me'
};
