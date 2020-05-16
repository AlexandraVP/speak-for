const {messages} = require('../database');
const {dispatch, EVENTS} = require('../emitter');
const {getChannelTitle} = require('./channel');

const MESSAGE_LENGTH_LIMIT = 450;

async function getMessagesAfter(username, since){
    const channelName = await getChannelTitle(username);
    const newMessages = await messages()
        .find({date: {$gt: since}, channel: channelName})
        .sort({date: 1})
        .toArray();
    return newMessages;
}

async function getNewMessages(username, count){
    const channelName = await getChannelTitle(username);
    const newMessages = await messages()
        .find({channel: channelName})
        .sort({date: -1})
        .limit(count)
        .toArray();
    return newMessages.sort((a, b) => a.date - b.date);
}

async function getMessagesBefore(username, until, count){
    const channelName = await getChannelTitle(username);
    const newMessages = await messages()
        .find({date: {$lt: until}, channel: channelName})
        .sort({date: -1})
        .limit(count)
        .toArray();
    return newMessages.sort((a, b) => a.date - b.date);
}

async function publishMessage(username, sourceText){
    const text = sourceText.slice(0, MESSAGE_LENGTH_LIMIT);
    const channelName = await getChannelTitle(username);
    await messages().insert({
        author: username,
        text,
        channel: channelName,
        date: Date.now(),
    });
    dispatch(EVENTS.NEW_MESSAGE, {text, author: username, channelName});
    return true;
}

module.exports = {
    getMessagesAfter,
    getNewMessages,
    getMessagesBefore,
    publishMessage
};
