
const messages = [];

export function getMessagesCount(){
    return messages.length;
}

export function addMessages(newMessages){
    messages.push(...newMessages);
}