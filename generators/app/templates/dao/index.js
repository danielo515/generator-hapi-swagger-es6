'use strict';

const Users = require('./users');

module.exports = (db) => {

    return {
        users: Users(db) // Data Access Object for managing the users collection.
    };
};
