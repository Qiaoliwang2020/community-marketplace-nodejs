const express = require('express');
const router = express.Router();
const uploadRoute = require('./uploadRoute');


module.exports = (params) => {
    router.use('/upload',uploadRoute(params))
    return router;
};