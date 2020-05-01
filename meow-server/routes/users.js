const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {users } = require('../database');

const Permissions = {
    GUEST: 0,
    ADMIN: 32
};

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

router.post('/register', function(req, res) {
    const {username, password, about} = req.body;
    const userExists = !!users()
        .find({username: username})
        .count();
    if(userExists) {
        res.status(403);
        res.send('Username has been already taken!');
    } else {
        bcrypt.hash(password, username, (err, encrypted) => {
            users()
                .insert({
                    username: username,
                    encrypted,
                    permissions: Permissions.GUEST,
                    date: Date.now(),
                    about
                }, (err) => {
                    if(!err) {
                        res.status(200);
                        res.send('Ok');
                    }else{
                        res.status(500);
                        res.send();
                    }
                });
        });
    }
});


router.post('/login', function(req, res) {
    const {username, password, about} = req.body;
    const user = users().findOne({username: username});
    if(!user) {
        res.status(405);
        res.send('Invalid username or password');
    }else{
        bcrypt.hash(password, username, (err, encrypted) => {
            if(user.encrypted !== encrypted){
                res.status(405);
                res.send('Invalid username or password');
            }else{
                if(sessions.has(username)){
                    res.send({
                        token: sessions.get(username)
                    });
                }else{
                    const token = generateRandomToken();
                    sessions.set(token, username);
                    sessions.set(username, token);
                    res.send({
                        token
                    });
                }
            }
        });
    }
});

router.post('/logout', function(req, res) {
    if(authCheck(req)){
        const token = req.headers['x-auth-token'];
        if(!sessions.has(token)){
            res.status(401);
            res.send('Unauthorized');
        }else{
            const username = sessions.get(token);
            sessions.delete(token);
            sessions.delete(username);
            res.status(200);
            res.send('Ok');
        }
    }else{
        res.status(401);
        res.send('Unauthorized');
    }
});


module.exports = {
    router,
    Permissions,
    authCheck,
    getUserName
};