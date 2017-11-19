'use strict';

const Joi = require('joi');
const Boom = require('boom');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/users/register',
        config: {
            description: 'Sign up - Creates a new user',
            validate: {
                payload: {
                    username: Joi.string().min(6).max(20).required().description('The username is the users identifier'),
                    password: Joi.string().alphanum().min(6).max(20).required(),
                }
            },
            response: {
                status: {
                    200: Joi.object(),
                    400: Joi.object().keys({
                        statusCode: 400,
                        message: Joi.string().example('User could not be created because the format was wrong'),
                        error: Joi.string().example('Bad Request')
                    }),
                    500: Joi.object().keys({
                        statusCode: 500,
                        message: Joi.string().example('An internal server error occurred'),
                        error: Joi.string().example('Internal Server Error')
                    })
                }
            },
            handler(request, reply) {

                request.DAO.users.insert(request.payload)
                    .then((result) => {

                        return reply({ userCreated: result.inserted });
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
