'use strict';

exports.register = function (server, options, next) {

    server.route({
        path: '/ops/healthcheck',
        method: 'GET',
        <% if(useAuthentication) { %>config: {
            auth: false
        },
        <% } %>handler(request, reply) {

            return reply({ message: 'ok' });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'healthcheck'
};
