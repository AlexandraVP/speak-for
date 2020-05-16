const {users, Permissions} = require('../database');
const CryptoJS = require('crypto-js');
const {dispatch, EVENTS} = require('../emitter');
const {FAQ_BOT_NAME} = require('./faq-bot');

function encrypt(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
}

async function verifyUser(username, password){
    const user = await users()
        .findOne({username: username});
    return !!user && encrypt(password) === user.encrypted;
}

async function userExists(username){
    if(username === FAQ_BOT_NAME){
        return true;
    }
    const usersCount = await users()
        .find({username: username})
        .count();
    return usersCount > 0;
}

async function createUser(username, password){
    const encrypted = encrypt(password);
    await users()
        .insert({
            username: username,
            encrypted,
            permissions: Permissions.GUEST,
            date: Date.now()
        });
    dispatch(EVENTS.NEW_USER, {username});
    return true;
}

module.exports = {
    verifyUser,
    userExists,
    createUser
};