var express = require('express');
var router = express.Router();

const users = new Set();
const sessions = new Map();

function generateRandomToken(){
    return [4,4,6].map(size =>
        new Array(size).fill(0)
            .map(() => (Math.random()*26 | 0).toString(26))
            .join('')
    ).join('-');
}

function authCheck(req){
    const token = req.headers['x-auth-token'];
    return sessions.has(token);
}

function getUserName(req){
    const token = req.headers['x-auth-token'];
    return sessions.get(token);
}

router.post('/login', function(req, res, next) {
    const username = req.body.username;
    if(users.has(username)){
        res.status(403);
        res.send('Username has been already taken!');
    }else{
        const token = generateRandomToken();
        sessions.set(token, username);
        users.add(username);
        res.send({
            token
        });
    }
});

router.post('/logout', function(req, res, next) {
    if(authCheck(req)){
        const token = req.headers['x-auth-token'];
        const username = sessions.get(token);
        sessions.delete(token);
        users.delete(username);
        res.status(200);
        res.send('Ok');
    }else{
        res.status(401);
        res.send('Unauthorized');
    }
});

module.exports = {
    router,
    authCheck,
    getUserName
};