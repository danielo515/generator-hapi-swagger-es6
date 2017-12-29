# generator-hapi-swagger-es6 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![npm](https://img.shields.io/npm/dt/generator-hapi-swagger-es6.svg?style=flat-square)](https://www.npmjs.com/package/generator-hapi-swagger-es6)
> A modern hapi REST service with automatic documentation using swagger with optional docker support

## Installation

First, install [Yeoman](http://yeoman.io) and generator-hapi-swagger-es6 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-hapi-swagger-es6
```

Then generate your new project:

```bash
yo hapi-swagger-es6
```

## Generator Features

This generator creates a hapi backend with the following features:

* Lab for testing
* Swagger for automatic endpoint documentation
* Console output by Good (good-squeeze and good-console)
* Two example endpoints (version and healtcheck)
* Testing examples including the main server and the two endpoints
* A Dockerfile and a docker-compose files for deploying as a microservice (optional)
* npm scripts for starting the server, starting on dev-mode with hot reloading (thanks to nodemon)

The generated code expects a node version `>=6` because it makes a heavy use of destructuring.
We target cleaniness, simple folder structure and folowing hapi guidelines.

## Generator options
After running the command `yo` and he selecting the **Hapi Swagger Es6**, the user has to choose some options to configure the project.
* **Personal information**: name, full name, github account, email, etc.
* **Docker**: if selected a docker-compose.yml and Dockerfile files are added to the project. It is included by default.
* **JWT Authentication**: *hapi-auth-jwt2* and *jsonwebtoken* plugins are used to provide JSON Web Token Authentication. It is included by default.

## Generated project endpoints
* GET **`/ops/healthcheck`**: just returns a message saying 'ok'.
* GET **`/ops/version`**: returns the package.json version.
* POST **`/users/login`** [JWT Authentication only]: Login a user and generates a new authentication token which expires in 1 day.
* POST **`/users/register`** [JWT Authentication only]: Register - Creates a new user.
* GET **`/users/me`** [JWT Authentication only]: Get the current user information details - [ *Authentication required* ]'

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Danielo Rodriguez Rivero](https://danielorodriguez.com)


[npm-image]: https://badge.fury.io/js/generator-hapi-swagger-es6.svg
[npm-url]: https://npmjs.org/package/generator-hapi-swagger-es6
[travis-image]: https://travis-ci.org/danielo515/generator-hapi-swagger-es6.svg?branch=master
[travis-url]: https://travis-ci.org/danielo515/generator-hapi-swagger-es6
[daviddm-image]: https://david-dm.org/danielo515/generator-hapi-swagger-es6.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/danielo515/generator-hapi-swagger-es6
[coveralls-image]: https://coveralls.io/repos/danielo515/generator-hapi-swagger-es6/badge.svg
[coveralls-url]: https://coveralls.io/r/danielo515/generator-hapi-swagger-es6
