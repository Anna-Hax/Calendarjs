import express from 'express';

import bodyParser from 'body-parser';

const app = express()

//const __dirname = import.meta.dirname;

import cors from './cors/index.js';

app.use(cors)
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

import signuprouter from './router/signup.js';
app.use("/signup", signuprouter);

import loginrouter from './router/login.js';
app.use("/login", loginrouter);

import eventrouter from './router/events.js';
app.use("/event", eventrouter);

app.listen(port, () => {
    console.log('listening on port', port)
});