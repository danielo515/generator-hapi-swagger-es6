'use strict';

var bcrypt = require('bcrypt'); // To hash passwords
const saltRounds = 10;

/**
 * This module accepts a database connection and exports a set of methods to interact with this database.
 *
 * @param {Object} db is a mongo database object.
 * @exports {Object} that is a factory containing the following data access' functions as properties:
 *          - findByUsername
 *          - updateByUsername
 *          - insert
 *          - login
 */
module.exports = (db) => {

    const users = db.collection('users');

    /**
     * This function finds a user by its username key.
     *
     * @param {String} username
     * @returns {Promise} the user object stored in the database.
     */
    const findByUsername = (username) => {

        return users.findOne({ username });
    };

    /**
     * This function checks if the credentials of a user are correct.
     *
     * @param {String} username
     * @param {String} password
     * @returns {Promise} that will be true if the credentials are correct otherwise false.
     */
    const checkCredentials = (username, password) => {

        return users.findOne({ username })
            .then((user) => {

                if (!user) { return false }
                // Comparison between hashed password stored in the database and the password that the user has sended to the backend.
                return bcrypt.compare(password, user.password).then((result) => {

                    if (result) {       // The passwords matched
                        return user;    // Login success
                    }
                    return false; // Login failed: if the user does not exist or the passwords did not match then we return false
                });
            });
    };

    /**
     * This function inserts a new object for a user in the database.
     * The password field is hashed using bcrypt library and 10 rounds.
     *
     * @param {Object} newUser that has the information of a user.
     * @returns {Promise} that will consist in two keys: the inserted user and the response of the database.
     */
    const insert = (newUser) => {

        return bcrypt.hash(newUser.password, saltRounds).then((hash) => {

            // Store hashed password in DB
            const userToStore = Object.assign({}, newUser, { password: hash });

            return users.insertOne(userToStore)
                .then((res) => {

                    if (res.insertedCount === 1) {
                        res.userCreated = userToStore;
                        return res;
                    }
                    return res;
                });
        });
    };

    /**
     * This function is useful to update some fields of an existing user.
     *
     * @param {String} username is unique in the database and it is the searching key.
     * @param {Object} user is the new object that is going to be stored for that user.
     * @returns {Promise} that will be the response of the mongo database.
     */
    const updateByUsername = (username, user) => {

        return users.update({ username }, user);
    };

    return {
        findByUsername,
        updateByUsername,
        insert,
        checkCredentials
    };
};
