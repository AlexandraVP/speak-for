const {users, Permissions, messages} = require('../database');
const {getUserName} = require('./auth');

const GUESTS_LIMIT = 500;
const GUEST_MESSAGES_LIMIT = 50;

async function limitGuestUsers(req, res, next){
    const usersCount = await users()
        .find({permission: Permissions.GUEST})
        .count();
    if (usersCount > GUESTS_LIMIT) {
        res.status(405);
        res.send("Guest users limit has been exceeded!");
    }else{
        next();
    }
}

async function limitGuestMessages(req, res, next){
    const username = getUserName(req);
    const user = await users()
        .find({username});
    if (user.permission === Permissions.GUEST) {
        const messagesCount = await messages()
            .find({author: username})
            .count();
        if (messagesCount >= GUEST_MESSAGES_LIMIT) {
            res.status(405);
            res.send("Messages limit has been exceeded!");
            return;
        }
    }
    next();
}

module.exports = {
    limitGuestUsers,
    limitGuestMessages
};
