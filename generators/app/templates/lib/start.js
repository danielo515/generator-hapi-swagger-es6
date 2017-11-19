// Load modules
'use strict';

const Config = require('getconfig');
const Hoek = require('hoek');
const Server = require('./index');
const DAO = require('./../dao');

// Declare internals

const internals = {};

internals.manifest = {
    connections: [
        {
            port: process.env.PORT || Config.server.port
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
        <% if(useAuthentication){ %>{
            plugin: './api/users/register.POST'
        },
        {
            plugin: './api/users/login.POST'
        },
        {
            plugin: './../authentication'
        }<% } %>
    ]
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);
    const Mongo = require('mongodb').MongoClient;
    const URL = 'mongodb://localhost:27017';

    Mongo.connect(URL)
        .then((db) => {

            const _DAO = DAO(db);
            server.decorate('request', 'DAO', _DAO);
            server.log(process.env.npm_package_name + ' v' + process.env.npm_package_version + ' started at: ' + server.info.uri);
        });
});
