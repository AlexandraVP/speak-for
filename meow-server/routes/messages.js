var express = require('express');
var router = express.Router();
const {authCheck, getUserName} = require('./auth');

const messages = [];

router.get('/', function(req, res, next) {
    if(!authCheck(req)){
        res.status(401);
        res.send('Unauthorized');
    }else{
        const from = req.query.from || 0;
        res.send(messages.slice(from));
    }
});

router.post('/', function(req, res, next) {
    if(!authCheck(req)){
        res.status(401);
        res.send('Unauthorized');
    }else{
        const text = req.body.text;
        messages.push({
            text,
            author: getUserName(req)
        });
        res.send({
            length: messages.length
        });
    }
});

module.exports = router;