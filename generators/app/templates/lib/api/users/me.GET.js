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
            response: {
                status: {
                    200: Joi.object().keys({
                        user: Joi.object().keys({
                            username: Joi.string()
                        }),
                        iat: Joi.number()
                    }),
                    401: Joi.alternatives().try(
                        Joi.object().keys({
                            statusCode: 401,
                            error: Joi.string().example('Unauthorized'),
                            message: Joi.string().example('Missing authentication')
                        }),
                        Joi.object().keys({
                            statusCode: 401,
                            error: Joi.string().example('Unauthorized'),
                            message: Joi.string().example('Invalid token format'),
                            attributes: Joi.object().keys({
                                error: Joi.string().example('Invalid token format')
                            })
                        })
                    ),
                    500: Joi.object().keys({
                        statusCode: 500,
                        error: Joi.string().example('Internal Server Error'),
                        message: Joi.string().example('An internal server error occurred')
                    })
                }
            },
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
