const express = require('express');
const router = express.Router();
const uploadRoute = require('./uploadRoute');
const activitiesRoute = require('./activitiesRoute');
const activityDetailsRoute = require('./activityDetailsRoute');



module.exports = (params) => {
    router.use('/upload',uploadRoute(params))
    router.use('/activities',activitiesRoute(params))
    router.use('/activity',activityDetailsRoute(params));
    return router;
};