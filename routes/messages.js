const express = require('express');
const router = express.Router();
const {requireAuth, getUserName} = require('../domain/auth');
const {limitGuestMessages} = require('../domain/guest-limits');
const {getMessagesAfter, getNewMessages, getMessagesBefore, publishMessage} = require('../domain/message');

router.use(requireAuth);

router.get('/after', async function (req, res) {
    const since = Number(req.query.since);
    const newMessages = await getMessagesAfter(getUserName(req), since);
    res.send(
        newMessages,
    );
});

router.get('/new', async function (req, res) {
    const count = Number(req.query.count);
    const newMessages = await getNewMessages(getUserName(req), count);
    res.send(newMessages);
});

router.get('/before', async function (req, res) {
    const count = Number(req.query.count);
    const until = Number(req.query.until);
    const newMessages = await getMessagesBefore(getUserName(req), until, count);
    res.send(newMessages);
});

router.use('/send', limitGuestMessages);
router.post('/send', async function (req, res) {
    await publishMessage(getUserName(req), req.body.text);
    res.send('Ok');
});

module.exports = router;