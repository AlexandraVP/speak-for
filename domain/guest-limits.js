const {users, Permissions, messages} = require('../database');
const {subscribe, EVENTS} = require('../emitter');

const GUESTS_LIMIT = 500;
const GUEST_MESSAGES_LIMIT = 50;

async function limitGuestUsers(req, res, next){
    const usersCount = await users()
        .find({permission: Permissions.GUEST})
        .count();
    if (usersCount > GUESTS_LIMIT) {
        res.status(405);
        res.send("Guest users limit has been exceeded!");
    }else{
        next();
    }
}

subscribe(EVENTS.NEW_MESSAGE, async ({channelName}) => {
    const channelMessagesCount = await messages().find({
        channel: channelName
    }).count();
    if(channelMessagesCount > GUEST_MESSAGES_LIMIT) {
        await messages().find({
            channel: channelName
        })
        .sort({date: 1})
        .removeOne({});
    }
});



module.exports = {
    limitGuestUsers
};
