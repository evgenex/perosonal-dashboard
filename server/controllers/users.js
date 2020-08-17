const express = require('express');
const db = require('./db');

let users = express.Router();


users.post('/login', (req, res)=> {
  db.all(`SELECT username FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`, (err, result)=> {
    if(err) {
        res.type('application/json');
        res.send({
            status: 'err',
            result: err,
        });
    }
    else{
        res.type('application/json');
        res.send({
            status: 'OK',
            result: result,
        });
    }      
    }); 
});

users.post('/signup', function(req, res) {
    db.run(`INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}')`, 
        function (err, result) {
        if(err) {
            res.type('application/json');
            res.send({
                status: 'err',
                result: err,
            });
        }
        else{
            db.get(`SELECT username FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (err, result)=>{
                res.type('application/json');
                res.send({
                    status: 'OK',
                    result: result,
                });
            })
        }      
    }); 
});



module.exports = users;