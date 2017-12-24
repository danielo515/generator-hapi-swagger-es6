'use strict';

const Joi = require('joi');


module.exports = Joi.object().keys({
  username: Joi.string().min(6).max(20).required().description('The username is the user\'s identifier'),
  password: Joi.string().alphanum().min(6).max(20).required()
});
