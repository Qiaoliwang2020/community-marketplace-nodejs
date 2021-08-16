const express = require('express');
const router = express.Router();
const uploadRoute = require('./uploadRoute');
const activitiesRoute = require('./activitiesRoute');



module.exports = (params) => {
    router.use('/upload',uploadRoute(params))
    router.use('/activities',activitiesRoute(params))
    return router;
};