const {users, Permissions} = require('../database');
const CryptoJS = require('crypto-js');

function encrypt(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
}

async function verifyUser(username, password){
    const user = await users()
        .findOne({username: username});
    return !!user && encrypt(password) === user.encrypted;
}

async function userExists(username){
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
    return true;
}

module.exports = {
    verifyUser,
    userExists,
    createUser
};