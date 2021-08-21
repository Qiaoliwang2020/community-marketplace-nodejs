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
    console.log('hit activity');

  });
  router.post("/createActivities", async (req, res, next) => {
    let activity = req.body;
    activity.createTime = moment().format('L');
    activity.expire = moment().add(1, 'years').calendar();
    try {

      const result = await client.db("MarketPlace").collection("activities").insertOne(activity);

      return res.json({success:true,data:{info:'inserted'}});

    } catch (err) {
      console.log("Error when create new area", err);
      return next(err);
    }
  })

  router.get('/getActivities',async (req, res, next) =>{
    try{
        await client.db("reckoning").collection("activities").find().toArray(function (err,result) {
            if (err) throw err;
            return res.json({success:true,data:result});
        })
    }
    catch (err) {
        console.log("Error on get units end point", err);
        return next(err);
    }
  })

  return router;
};