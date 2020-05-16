const {EVENTS, subscribe} = require('../emitter');
const {createChannel, joinChannel} = require('./channel');
const questionsList = require('./data/questions');
const phrasesList = require('./data/phrases');
const {messages} = require('../database');

const FAQ_BOT_NAME = 'charlie';

const S = 1000;

function getRandomQuestion(){
    const index = Math.round(Math.random()*(questionsList.length-1));
    return questionsList[index];
}

function getRandomReaction(){
    const index = Math.round(Math.random()*(phrasesList.length-1));
    return phrasesList[index];
}

const USER_STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    JUST_ANSWERED: 'JUST_ANSWERED',
    WAITING: 'WAITING',
    NOT_ANSWERED: 'NOT_ANSWERED',
    AFK: 'AFK',
};

async function sendMessage(text, channelName){
    await messages().insert({
        author: FAQ_BOT_NAME,
        text,
        channel: channelName,
        date: Date.now(),
    });
    return true;
}

function formatName(username){
    return `${username[0].toUpperCase()}${username.slice(1)}`;
}

const onlineUsers = new Map();

subscribe(EVENTS.NEW_USER, async ({username}) => {
    const channelName = `${formatName(username)} and Charlie bot`;
    await createChannel(channelName);
    await joinChannel(username, channelName);
    await sendMessage(`Hello ${formatName(username)}!`, channelName);
    await sendMessage(`Feel free to use this demo version of chat.`, channelName);
    await sendMessage(`You have 50 messages limit.`, channelName);
    await sendMessage(`This conversation is not visible for other demo users.`, channelName);
});

setInterval(async function(){
    for(const [username, userInfo] of onlineUsers){
        const inactiveTime = Date.now() - userInfo.lastActivity;

        if(inactiveTime > 60  * S && userInfo.status !== USER_STATUS.AFK) {
            await sendMessage(`Are you here, ${formatName(username)}?`, userInfo.channel);
            userInfo.status = USER_STATUS.AFK;
            continue;
        }

        switch(userInfo.status){
            case USER_STATUS.NOT_STARTED:
                if(inactiveTime > 10 * S){
                    await sendMessage(`What's up, ${formatName(username)}?`, userInfo.channel);
                    userInfo.status = USER_STATUS.NOT_ANSWERED;
                }
                break;
            case USER_STATUS.JUST_ANSWERED:
                if(inactiveTime > 5 * S) {
                    await sendMessage(getRandomReaction(), userInfo.channel);
                    userInfo.status = USER_STATUS.WAITING;
                }
                break;
            case USER_STATUS.WAITING:
                if(inactiveTime > 10 * S) {
                    await sendMessage(getRandomQuestion(), userInfo.channel);
                    userInfo.status = USER_STATUS.NOT_ANSWERED;
                }
        }

    }
}, 5 * 1000);

subscribe(EVENTS.NEW_MESSAGE, async ({author, channelName}) => {
    const userInfo = onlineUsers.get(author);
    userInfo.lastActivity = Date.now();
    userInfo.status = USER_STATUS.JUST_ANSWERED;
});

subscribe(EVENTS.USER_LOG_IN, async ({username}) => {
    onlineUsers.set(username, {
        lastActivity: Date.now(),
        status: USER_STATUS.NOT_STARTED,
        channel: `${formatName(username)} and Charlie bot`
    });
});

subscribe(EVENTS.USER_LOG_OUT, async ({username}) => {
    onlineUsers.delete(username);
});

module.exports = {
    FAQ_BOT_NAME
};