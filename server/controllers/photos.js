const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const Jimp = require('jimp');

let photos = express.Router();
photos.use(fileUpload());


photos.get('/list', function(req, res) {
    const directoryPath = path.join(__dirname, '../files');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.type('application/json');
            res.send({
                status: 'err',
                result: err,
            });
        } 
        let photolist = []
        files.forEach(function (file) {
            photolist.push(file)
        });
        res.type('application/json');
            res.send({
                status: 'OK',
                result: photolist,
            });
    });
  });

photos.post('/', (req, res)=> {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const id = req.body.id;
    const fileName = Date.now() + '-' + file.name;

    file.mv(path.join(__dirname, '../files/', fileName), (err)=>{
        if(err) {
            res.type('application/json');
            res.send({
                status: 'err',
                result: err,
            });
        }else {
            Jimp.read(path.join(__dirname, '../files/', fileName), (err, lenna) => {
                if (err) throw err;
                lenna
                  .resize(280, 280) // resize
                  .quality(60) 
                  .write(path.join(__dirname, '../files/', fileName))
              })
              res.type('application/json');
                res.send({
                    status: 'OK',
                });
        }
    })
});

photos.get('/:file', function(req, res) {
    res.sendFile(path.join(__dirname, '../files/',  req.params.file));
  });


module.exports = photos;