const jwt = require('jsonwebtoken');
// config = require('../config');
require('dotenv').config();


module.exports = {
    isAuthenticated: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token) {
            res.status(401).json({ msg: "No authentication token, authorization denied." });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    console.log(err, "error")
                    res.status(401).json({ msg: "Token verification failed, authorization denied." });
                } else {
                    req.name = decoded.name;
                    req.username = decoded.name;
                    next();
                }
            });
        }
    },
    getUserData: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token) {
            res.status(401).json({ msg: "No authentication token, authorization denied." });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                req.name = decoded.name;
                req.username = decoded.username;
                next();
            });
        }
    }
};
