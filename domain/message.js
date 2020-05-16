const {messages} = require('../database');

const MESSAGE_LENGTH_LIMIT = 450;

async function getMessagesAfter(since){
    const newMessages = await messages()
        .find({date: {$gt: since}})
        .sort({date: 1})
        .toArray();
    return newMessages;
}

async function getNewMessages(count){
    const newMessages = await messages()
        .find({})
        .sort({date: -1})
        .limit(count)
        .toArray();
    return newMessages.sort((a, b) => a.date - b.date);
}

async function getMessagesBefore(until, count){
    const newMessages = await messages()
        .find({date: {$lt: until}})
        .sort({date: -1})
        .limit(count)
        .toArray();
    return newMessages.sort((a, b) => a.date - b.date);
}

async function publishMessage(author, text){
    await messages().insert({
        author,
        text: text.slice(0, MESSAGE_LENGTH_LIMIT),
        date: Date.now(),
    });
    return true;
}

module.exports = {
    getMessagesAfter,
    getNewMessages,
    getMessagesBefore,
    publishMessage
};
