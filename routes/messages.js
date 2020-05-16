const express = require('express');
const router = express.Router();
const {authCheck, getUserName} = require('./users');
const {messages, users, Permissions} = require('../database');

const GUEST_MESSAGES_LIMIT = 50;
const MESSAGE_LENGTH_LIMIT = 450;

router.get('/after', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const since = Number(req.query.since);
        const newMessages = await messages()
            .find({date: {$gt: since}})
            .sort({date: 1})
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
        const newMessages = await messages()
            .find({})
            .sort({date: -1})
            .limit(count)
            .toArray();
        res.send(
            newMessages.sort((a,b) => a.date - b.date),
        );
    }
});

router.get('/before', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const count = Number(req.query.count);
        const until = Number(req.query.until);
        const newMessages = await messages()
            .find({date: {$lt: until}})
            .sort({date: -1})
            .limit(count)
            .toArray();
        res.send(
            newMessages.sort((a,b) => a.date - b.date),
        );
    }
});



router.post('/', async function (req, res) {
    if (!authCheck(req)) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        const text = req.body.text.slice(0,MESSAGE_LENGTH_LIMIT);
        const username = getUserName(req);
        const user = await users()
            .find({username});
        if(user.permission === Permissions.GUEST){
            const messagesCount = await messages()
                .find({author: username})
                .count();
            if(messagesCount >= GUEST_MESSAGES_LIMIT){
                res.status(405);
                res.send("Messages limit has been exceeded!");
                return;
            }
        }
        await messages().insert({
            author: getUserName(req),
            text,
            date: Date.now(),
        });
        res.send('Ok');
    }
});

module.exports = router;