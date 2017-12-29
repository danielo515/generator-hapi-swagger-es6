// Load modules
'use strict';

const Config = require('getconfig');
const Hoek = require('hoek');
const Server = require('./index');
<% if(useAuthentication){ -%>
    const Mongo = require('mongodb').MongoClient;
    const DAO = require('./../dao/index');
<% } -%>

// Declare internals
const internals = {};

internals.manifest = {
    connections: [
        {
            port: process.env.PORT || Config.server.port || <%- service.port %>
        }
    ],
    registrations: [
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'lout'
        },
        {
            plugin: {
                register: 'hapi-swagger',
                options: {
                    info: {
                        title: '<%- service.description %>',
                        version: process.env.npm_package_version
                    },
                    expanded: 'full',
                    jsonEditor: true,
                    pathPrefixSize: 2
                }
            }
        },
        {
            plugin: {
                register: 'good',
                options: {
                    reporters: {
                        consoleReporter: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ log: '*', response: '*', request: '*', error: '*' }]
                            },
                            {
                                module: 'good-console',
                                args: [{ format: 'MM/DD/Y hh:mm:ss' }]
                            }, 'stdout']
                    }
                }
            }
        },
        {
            plugin: './api/version'
        },
        {
            plugin: './api/healthcheck'
        },
        <% if(useAuthentication) { -%>
            {
                plugin: './../authentication'
            },
            {
                plugin: './api/users/login.POST'
            },
            {
                plugin: './api/users/me.GET'
            },
            {
                plugin: './api/users/register.POST'
            }
        <% } -%>
    ]
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);
    <% if(useAuthentication){ -%>
        const URL = 'mongodb://localhost:27017';

        Mongo.connect(URL)
            .then((db) => {

                server.decorate('request', 'DAO', DAO(db));
                server.log(process.env.npm_package_name + ' v' + process.env.npm_package_version + ' started at: ' + server.info.uri);
            })
            .catch((error) => {

                if (error) {
                    throw (error);
                }
            });
    <% } else { -%>
    server.log(process.env.npm_package_name + ' v' + process.env.npm_package_version + ' started at: ' + server.info.uri);
    <% } -%>
});
