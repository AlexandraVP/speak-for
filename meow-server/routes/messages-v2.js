const express = require('express');
const router = express.Router();
const {authCheck, getUserName} = require('./users');
const {messages} = require('../database');

router.get('/', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const from = Number(req.query.from) || 0;
        //const to = req.query.to;
        const newMessages = await messages()
            .find({
                index: {$gte: from/*, $lt: to*/}
            }).toArray();
        res.send(
            newMessages
        );
    }
});

router.post('/', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const text = req.body.text;
        const length = await messages()
            .find({})
            .count();
        await messages()
            .insert({
                index: length,
                author: getUserName(req),
                channel: 0,
                text,
                date: Date.now()
            });
        res.send('Ok');
    }
});

module.exports = router;