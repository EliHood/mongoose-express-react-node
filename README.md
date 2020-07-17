<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

<p align="center">
   <a href="https://travis-ci.com/amazingandyyy/mern">
      <img src="https://travis-ci.com/amazingandyyy/mern.svg?branch=master" />
   </a>
   <a href="https://github.com/amazingandyyy/mern/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, Reactjs, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## PROJECT SETUP

1. `git clone` this repo
2. Install all dependencies for both the front-end and back-end
3. Install `nodemon` and change your directory to the root directory of the project and then run `npm run dev`
4. The project will run concurrently

## clone or download

```terminal
$ git clone https://github.com/Babarindeolanrewaju2/mernapptask.git
$ change your directory to the client directory and run the command below
$ npm i
$ in the root folder of the project run the command below
$ npm i
and then run `npm run dev` in the root directory

...
```

# Usage (run fullstack app on your machine)

## Prerequirements

- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, the client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)

```terminal
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 4000)

### Start

```terminal
$ cd mernapptask   // go to root folder of the project
$ npm i       // npm install pacakges
$ npm run dev // run it locally
```

## Deploy Server to [Heroku](https://dashboard.heroku.com/)

```terminal
$ npm i -g heroku
$ heroku login
...
$ heroku create
$ npm run heroku:add <your-super-amazing-heroku-app>
// remember to run this command in the root level, not the server level, so if you follow the documentation along, you may need to do `cd ..`
$ pwd
/Users/<your-name>/mern
$ npm run deploy:heroku
```

# Dependencies(tech-stacks)

| Client-side                   | Server-side           |
| ----------------------------- | --------------------- |
| axios: ^0.15.3                | bcrypt-nodejs: ^0.0.3 |
| babel-preset-stage-1: ^6.1.18 | body-parser: ^1.15.2  |
| react: ^16.2.0                | bcrypt: ^5.0.0        |
| react-dom: ^16.2.0            | express: ^4.17.1      |
| react-bootstrap: ^1.0.1       | cookie-parser: ^1.4.5 |
| react-router-dom: ^4.2.2      | cors: ^2.8.5          |
| bootstrap: ^4.5.0             | jsonwebtoken: ^8.5.1  |
| axios: ^0.19.2                | mongoose: ^5.9.20     |
| universal-cookie: ^4.0.3      | morgan: ^1.10.0       |
| -                             | nodemon: ^2.0.4       |
| -                             | path : ^0.12.7        |
| -                             | helmet: ^3.23.3       |

## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/amazingandyyy/mern/issues) (preferred)

Email Me: olanrewajuayuba@gmail.com (welcome, say hi)

## Author

[Ayubaolanrewaju](https://amazingandyyy.com)

### License

[MIT](https://github.com/amazingandyyy/mern/blob/master/LICENSE)
