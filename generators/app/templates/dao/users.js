'use strict';

/**
 * This module accepts a database connection and exports a set of methods to interact with this database.
 *
 * @param {Object} db is a mongo database object.
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
    const login = (username, password) => {

        return users.findOne({ username, password })
            .then((user) => {

                if (user) {
                    return user;
                }
                return false;
            });
    };

    /**
     * This function inserts a new object for a user in the database.
     *
     * @param {Object} newUser that has the information of a user.
     * @returns {Promise} that will consist in two keys: the inserted user and the response of the database.
     */
    const insert = (newUser) => {

        return users.insertOne(newUser)
            .then((res) => {

                return { inserted: newUser, result: res.result };
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
        login
    };
};
