const MongoClient = require('mongodb').MongoClient;

let _database = null;

MongoClient.connect('mongodb://localhost:27017/meowbase', (err, database) => {
    if (err) {
        console.log(err);
    }else{
        _database = database;
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


module.exports = {
    db,
    users,
    messages
};