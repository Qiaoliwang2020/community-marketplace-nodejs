const express = require('express');
const fs = require('fs');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir('./public/uploads/',(err)=>{
            cb(null, './public/uploads/');
        });
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    },
})

const uploadStorage = multer({ storage: storage })


module.exports = params => {

    const {client} = params;

    router.get('/',async (req, res, next) =>{
        console.log(`upload root hit`)
    })

    router.post("/uploadFile", uploadStorage.single("image"), (req, res,next) => {
        if (req.file) { 
            let file = {
                fileName:req.file.originalname,
                filePath:req.file.path,
                type:req.file.mimetype,
                size:req.file.size,
                created:new Date().getTime()
            }
            client.db("reckoning").collection("uploadFiles").insertOne(file,(err,result)=>{
                console.log(result,'res');
                res.json({path:req.file.path}); 
            })
        }else{
         res.json({error:'Missing file'}); 
        } 
    })
    return router;
}
