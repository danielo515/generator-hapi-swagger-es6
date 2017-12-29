'use strict';

const Joi = require('joi');
const Boom = require('boom');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/users/register',
        config: {
            description: 'Register - Creates a new user',
            auth: false,
            tags: ['meta', 'users', 'api'],
            validate: {
                payload: {
                    username: Joi.string().min(6).max(20).required().description('The username is the users identifier'),
                    password: Joi.string().alphanum().min(6).max(20).required()
                }
            },
            response: {
                status: {
                    200: Joi.object().keys({
                        userCreated: Joi.object().keys({
                            username: Joi.string()
                        })
                    }),
                    400: Joi.object().keys({
                        statusCode: 400,
                        error: Joi.string().example('Bad Request'),
                        message: Joi.string().example('User could not be created because the format was wrong')
                    }),
                    500: Joi.object().keys({
                        statusCode: 500,
                        error: Joi.string().example('Internal Server Error'),
                        message: Joi.string().example('An internal server error occurred')
                    })
                }
            },
            handler(request, reply) {

                request.DAO.users.insert(request.payload)
                    .then((result) => {

                        if (result.insertedCount === 0) {
                            return reply(Boom.badRequest('User could not be created'));
                        }
                        return reply({
                            userCreated: {
                                username: result.userCreated.username
                            }
                        });
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
    name: 'register'
};
