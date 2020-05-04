const MongoClient = require('mongodb').MongoClient;

let _database = null;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        console.log(err);
    }else{
        _database = client.db('meowbase');
    }
});

function db(){
    return _database;
}

function users(){
    return db().collection('users');
}


function messages(){
    return db().collection('messages');
}

const Permissions = {
    GUEST: 0,
    ADMIN: 32
};

module.exports = {
    db,
    users,
    messages,
    Permissions
};