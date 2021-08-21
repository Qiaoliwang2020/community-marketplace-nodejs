const express = require('express');
// const { check, validator, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;


const router = express.Router();

// bodyParse setup
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = params => {
  const { client } = params;

  router.get("/", async (req, res, next) => {

    let activityId = req.query.id;

    try {
      let activityData = await client.db("MarketPlace").collection("activities").find({ _id: ObjectId(activityId)}).toArray();

      return res.render('layout', {
        template: 'activityDetails',
        activityData
      })

    } catch (err) {
      console.log("Error on dashboard enpoint", err);
      return next(err);
    }

  });

  return router;
};