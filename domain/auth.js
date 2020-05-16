
const sessions = new Map();

function generateRandomToken() {
    return [4, 4, 6].map(size =>
        new Array(size).fill(0)
            .map(() => (Math.random() * 26 | 0).toString(26))
            .join('')
    ).join('-');
}

function authCheck(req) {
    const token = req.headers['x-auth-token'];
    return sessions.has(token);
}

function getUserName(req) {
    const token = req.headers['x-auth-token'];
    return sessions.get(token);
}

function createSession(username){
    const token = generateRandomToken();
    sessions.set(token, username);
    sessions.set(username, token);
    return token;
}

function killSession(req){
    const token = req.headers['x-auth-token'];
    const username = sessions.get(token);
    sessions.delete(username);
    sessions.delete(token);
}

function getTokenByUsername(username){
    return sessions.has(username) ?  sessions.get(username) : null;
}

function requireAuth(req, res, next) {
    if(authCheck(req)){
        next();
    } else {
        res.status(401);
        res.send('Unauthorized');
    }
}

module.exports = {
    requireAuth,
    killSession,
    createSession,
    getUserName,
    getTokenByUsername
};