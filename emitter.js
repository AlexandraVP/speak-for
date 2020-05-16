const Emitter  = require('events');

const EVENTS = {
    NEW_USER: 'NEW_USER',
    NEW_MESSAGE: 'NEW_MESSAGE',
    USER_LOG_IN: 'USER_LOG_IN',
    USER_LOG_OUT: 'USER_LOG_OUT',
};

const emitter = new Emitter();

function dispatch(event, data){
    emitter.emit(event,data);
}

function subscribe(event, callback){
    emitter.on(event, callback);
}

module.exports = {
    dispatch,
    subscribe,
    EVENTS
}