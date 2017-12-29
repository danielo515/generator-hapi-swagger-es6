'use strict';

const Users = require('./users-dao/index');
const UserSchema = require('./users-dao/schema');


module.exports = (db) => {

    return {
        users: Users(db), // Data Access Object for managing the users collection.
        userSchema: UserSchema
    };
};
