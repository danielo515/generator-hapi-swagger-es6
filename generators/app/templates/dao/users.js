'use strict';

module.exports = (db) => {

    const users = db.collection('users');

    const findByUsername = (username) => {

        return users.findOne({ username });
    };

    const login = (username, password) => {

        return users.findOne({ username, password })
            .then((user) => {

                if (user) {
                    return user;
                }
                return false;
            });
    };

    const insert = (newUser) => {

        return users.insertOne(newUser)
            .then((res) => {

                return { inserted: newUser, result: res.result };
            });
    };

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
