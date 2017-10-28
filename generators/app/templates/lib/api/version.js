'use strict';
const internals = {
    response: {
        version: process.env.npm_package_version
    }
};


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/ops/version',
        config: {
            description: 'Returns the version of the server',
            handler(request, reply) {

                return reply(internals.response);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'version'
};
