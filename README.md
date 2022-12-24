# Leaderboard App

This is a Leaderboard webapp where you can signup/login and can add/withdraw your balance and the score will be reflected in the app.
The tech-stack used in building the app is:

```React.js, Node.js, Express, Socket.io, MongoDB, Redis & TailwindCSS```

Website Link: [Leaderboard App](https://fabulous-banoffee-68f1ea.netlify.app/)
                
API Link: [Leaderboard API](https://leaderboard-api-i94y.onrender.com)


## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/v8/commands/npm-install) to install the application and it's dependencies.

```bash
npm install 
node app.js
```

For the frontend you can do:

```bash
npm build
npm run dev
```

## Setup

To locally setup the leaderboard you can do the follwing steps:

Create a ```.env``` file with the following credentials for connecting to the server:

```
MONGO_URL = <MONGO_URL>
REDIS_HOST =  <REDIS_HOST>
REDIS_PASSWORD = <REDIS_PASS>
REDIS_PORT = <REDIS_PORT>
JWT_KEY = <SECRET JWT KEY>
PORT = <PORT>
```





