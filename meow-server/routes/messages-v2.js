var express = require('express');
var router = express.Router();
const {authCheck, getUserName} = require('./users');
const { messages } = require('../database');


router.get('/', function(req, res) {
    if(!authCheck(req)){
        res.status(401);
        res.send('Unauthorized');
    }else{
        const from = req.query.from || 0;
        const to = req.query.to;
        res.send(
            messages().find({index: { $gt: from, $lt: to}})
        );
    }
});

router.post('/', function(req, res) {
    if(!authCheck(req)){
        res.status(401);
        res.send('Unauthorized');
    }else{
        const text = req.body.text;
        const length = messages().find({}).count();
        messages().insert({
            index: length,
            author: getUserName(req),
            channel: 0,
            text,
            date: Date.now()
        }, (err) => {
            if(err) {
                res.status(500);
                res.send()
            }else{
                res.send('Ok');
            }
        });
    }
});

module.exports = router;