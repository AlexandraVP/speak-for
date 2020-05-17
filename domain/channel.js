const {channels} = require('../database');

async function createChannel(title) {
    await channels().insert({
        title,
        members: [],
    });
    return true;
}

async function joinChannel(username, channelName) {
    const channel = await channels().findOne({
        title: channelName,
    });
    if (channel.members.includes(username)) {
        return true;
    }
    channel.members.push(username);
    await channels().update(
        {title: channelName},
        {
            $set: {
                members: channel.members,
            },
        },
    );
    return true;
}

async function getGuestChannelTitle(username){
    const channel =  await channels()
        .findOne({members: username});
    return channel.title;
}

module.exports = {
    createChannel,
    joinChannel,
    getGuestChannelTitle
};