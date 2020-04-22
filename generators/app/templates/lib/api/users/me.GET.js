'use strict';


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/users/me',
        config: {
            auth: 'jwt',
            description: 'Get the current user information details - [ Authentication required ]',
            tags: ['meta', 'users', 'api'],
            handler(request, reply) {

                return reply(request.auth.credentials);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'me'
};
