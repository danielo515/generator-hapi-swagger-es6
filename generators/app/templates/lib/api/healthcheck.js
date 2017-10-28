'use strict';

exports.register = function (server, options, next) {

    server.route({
        path: '/ops/healthcheck',
        method: 'GET',
        handler: function (request, reply) {

            reply({ message: 'ok' });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'healthcheck'
};
