const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();

const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir('./public/uploadFiles',(err)=>{
            cb(null, './public/uploadFiles');
        });
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    },
})

const uploadStorage = multer({ storage: storage })


module.exports = params => {

    const {client} = params;

    // logic
    router.get('/',async (req, res, next) =>{
        console.log(`upload root hit`)
    })
   

    router.post('/uploadFile',uploadStorage.single('file'),async (req, res, next) =>{
        console.log(req,'res');
        // if(req.file){
        //     // res.json({message:'inserted'})
        //     // let file = {
        //     //     fileName:req.file.originalname,
        //     //     filePath:req.file.path,
        //     //     type:req.file.mimetype,
        //     //     size:req.file.size,
        //     //     status:uid.status,
        //     //     created:new Date().getTime()
        //     // }
        //     // client.db("reckoning").collection("uploadFiles").insertOne(file,(err,results)=>{
        //     //     res.json({message:'inserted'})
        //     // })
        // }
    })
    return router;
}
