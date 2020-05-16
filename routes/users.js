const express = require('express');
const router = express.Router();
const { verifyUser, userExists, createUser } = require('../domain/user');
const {limitGuestUsers} = require('../domain/guest-limits');
const {requireAuth, killSession, createSession, getUserName, getTokenByUsername} = require('../domain/auth');

router.use('/register', limitGuestUsers);
router.post('/register', async function (req, res) {
    const {username, password} = req.body;
    const usernameIsTaken = await userExists(username);
    if (usernameIsTaken) {
        res.status(403);
        res.send('Username has been already taken!');
        return;
    }
    await createUser(username, password);
    res.send('Ok');
});

router.post('/login', async function (req, res) {
    const {username, password} = req.body;
    const isValidUser = await verifyUser(username, password);
    if (!isValidUser) {
        res.status(405);
        res.send('Invalid username or password');
        return;
    }
    const token = getTokenByUsername(username) || createSession(username);
    res.send({token});
});

router.use('/logout', requireAuth);
router.post('/logout', function (req, res) {
    killSession(req);
    res.status(200);
    res.send('Ok');
});

module.exports = router;