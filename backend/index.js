const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const expressWebToken = require("express-jwt")

let credentials = {
    host: "iris-aws-db.c4hq5iosxryf.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "#!Pascal1050ti",
    database: 'iris_db', 
    ssl: true
};

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()

const jwtSecret = 'super_secret';
const jwtExpire = '6h';

router.use(expressWebToken({
    requestProperty: "account",
    credentialsRequired: false,
    secret: jwtSecret,
}));

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)

    req.res = res
    res.req = req
    next()
})


// Add POST - /api/login
router.post('/login', (req, res) => {
    if (req.body.username === 'demo' && req.body.password === 'demo') {

        let account = { id: 123, username: 'demo' };
        const token = jwt.sign(account, jwtSecret, {
            expiresIn: jwtExpire
        });
        return res.json({ username: 'demo', token })
    }
    res.status(401).json({ message: 'Bad credentials' })
})

// Export the server middleware
module.exports = {
    path: '/api',
    handler: router
}