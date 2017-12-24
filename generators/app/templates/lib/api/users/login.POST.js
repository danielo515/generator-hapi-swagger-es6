'use strict';

const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const Config = require('getconfig'); // Remember to change the value of the authKey to your JWT authentication key


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/users/login',
        config: {
            description: 'User sign-in',
            auth: false,
            tags: ['meta', 'users', 'api'],
            notes: 'Login a user and generates a new authentication token which expires in 1 day',
            validate: {
                payload: {
                    username: Joi.string().min(6).max(20).required().description('The username is the user\'s identifier'),
                    password: Joi.string().alphanum().min(6).max(20).required()
                }
            },
            response: {
                status: {
                    200: Joi.object().keys({
                        user: Joi.object().keys({
                            username: Joi.string()
                        })
                    }),
                    401: Joi.object().keys({
                        statusCode: 401,
                        error: Joi.string().example('Unauthorized'),
                        message: Joi.string().example('Login failed. User or password incorrect')
                    }),
                    500: Joi.object().keys({
                        statusCode: 500,
                        error: Joi.string().example('Internal Server Error'),
                        message: Joi.string().example('An internal server error occurred')
                    })
                }
            },
            handler(request, reply) {

                request.DAO.users.checkCredentials(request.payload.username, request.payload.password)
                    .then((user) => {

                        if (user) { // The user was successfully authenticated
                            // Delete confidential information
                            delete user.password;
                            delete user._id;

                            const session = {
                                user
                            };

                            // Generate a token for this user session and store the data in this session
                            const token = JWT.sign(session, Config.server.authKey);

                            return reply({
                                user: {
                                    username: user.username
                                }
                            })
                                .header('Authorization', token)  // where token is the JWT
                                .state('token', token, Config.server.jwtOptions);
                        }

                        // Authentication failed
                        return reply(Boom.unauthorized('Login failed. User or password incorrect'));
                    })
                    .catch((error) => {

                        if (error.isJoi) {
                            return reply(Boom.badRequest(error));
                        }
                        return reply(Boom.badImplementation('Internal server error: ', error));
                    });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'login'
};
