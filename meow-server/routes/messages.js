const express = require('express');
const router = express.Router();
const {authCheck, getUserName} = require('./users');
const {messages} = require('../database');


router.get('/after', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const from = Number(req.query.from);
        const newMessages = await messages()
            .find({index: {$gt: from}})
            .toArray();
        res.send(
            newMessages,
        );
    }
});

router.get('/new', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const count = Number(req.query.count);
        const length = await messages()
            .find({})
            .count();
        const newMessages = await messages()
            .find({index: {$gte: length - count}})
            .toArray();
        res.send(
            newMessages,
        );
    }
});

router.get('/before', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const count = Number(req.query.count);
        const from = Number(req.query.from);
        const newMessages = await messages()
            .find({index: {$lt: from, $gte: from-count}})
            .toArray();
        res.send(
            newMessages,
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
        await messages().insert({
            index: length,
            author: getUserName(req),
            channel: 0,
            text,
            date: Date.now(),
        });
        res.send('Ok');
    }
});

module.exports = router;