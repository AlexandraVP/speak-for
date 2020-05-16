const MongoClient = require('mongodb').MongoClient;

let _database = null;

const DATABASE_URI = process.env.MONGODB_URI || 'mongodb://localhost/meowchat23';
const DATABASE_NAME = process.env.DB_NAME;

MongoClient.connect(DATABASE_URI, (err, client) => {
    if (err) {
        console.log(err);
    }else{
        _database = client.db(DATABASE_NAME);
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