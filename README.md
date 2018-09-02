<p align="center">
  <h3 align="center">REST API with Express, MongoDB, JWT</h3>
  <p align="center">a RESTful API boilerplate for Express framework</p>
  <p align="center">
    <a href="https://travis-ci.org/me-io/node-api">
      <img src="https://img.shields.io/travis/me-io/node-api.svg?branch=master&style=flat-square" alt="Build Status">
    </a>
    <a href="LICENSE.md">
      <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License">
    </a>
    <a class="badge-align" href="https://www.codacy.com/app/Meabed/node-api">
      <img src="https://img.shields.io/codacy/grade/266923eec70e41418be8f981a5b4cefe.svg?style=flat-square"/>
    </a>
    <a href="https://www.paypal.me/meabed">
      <img src="https://img.shields.io/badge/paypal-Buy_Me_Coffee-179BD7.svg?style=flat-squares" alt="Buy Me Coffee">
    </a>
  </p>
</p>

## Features

* API CRUD with MongoDB Collection persistence. " KIS & VS" "Keep It Simple and Very Stupid"
* JWT Authentication
* Middleware "CORS, JWT"
* Endpoint Tests and Unit Tests
* CI - [Travis CI](https://travis-ci.org/)

## Directory Layout

```
.
├── __tests__
├── src
│   ├── controllers
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── utils
│   ├── routes.js
│   └── index.js
├── README.md
├── package.json
├── package-lock.json
└── yarn.lock

```

## Getting Started

First, clone the repo:

```bash
git clone https://github.com/me-io/node-api
```

### Install dependencies

```bash
npm install
# or you may use yarn 
yarn install
```

### Configure the Environment

Create `.config.override.ini` file at the root of the project and put the configuration you want to override:

```ini
; Database
MONGODB_HOST = 127.0.0.1
MONGODB_PORT = 27017
MONGODB_DATABASE = "todo"

; Redis
REDIS_HOST = 127.0.0.1
REDIS_PASSWORD = null
REDIS_PORT = 6379
REDIS_TTL = 300
```

You can see all the avaliable configuration inside `.config.ini` file.

### Run Application

To start making RESTful requests to node-api start the node server by running the following command:

```bash
npm run dev
# or you may use yarn 
yarn run dev
```

### Creating token

For creating token we have to use the `http://127.0.0.1:3000/api/user/login` route. Here is an example of creating token with [Postman](https://www.getpostman.com/).

![Imgur](https://i.imgur.com/LHKZ89W.png)

## Contributing

Anyone is welcome to [contribute](CONTRIBUTING.md), however, if you decide to get involved, please take a moment to review the guidelines:

* [Only one feature or change per pull request](CONTRIBUTING.md#only-one-feature-or-change-per-pull-request)
* [Write meaningful commit messages](CONTRIBUTING.md#write-meaningful-commit-messages)
* [Follow the existing coding standards](CONTRIBUTING.md#follow-the-existing-coding-standards)

## License

The code is available under the [MIT license](LICENSE.md).
