const express = require('express');
const fetch = require('node-fetch');


var feeds = express.Router();

feeds.get('/news', (req, res)=> {
    fetch('http://feeds.bbci.co.uk/news/rss.xml')
    .then(res => res.text())
    .then(body => {
        res.type('application/xml');
        res.send(body);
    });  
});

feeds.get('/sport', (req, res)=> {
    fetch('http://www.football-data.co.uk/mmz4281/1718/I1.csv')
    .then(res => res.text())
    .then(body => {
        res.type('application/csv');
        res.send(body);
    });
});

feeds.get('/clothes', (req, res)=> {
    fetch('https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil')
    .then(res => res.text())
    .then(body => {
        res.type('application/json');
        res.send(body);
    });
});

module.exports = feeds;