import {getMessages, sendMessage} from "./api.js";
import {appendMessageElements, subscribeInput} from "./component.js";
import {getMessagesCount, addMessages} from './state.js';

function updateMessages() {
    const from = getMessagesCount();
    getMessages(from).then(newMessages => {
        addMessages(newMessages);
        appendMessageElements(newMessages)
    });
}

function watchMessageUpdates() {
    updateMessages();
    setTimeout(watchMessageUpdates, 1000);
}

subscribeInput((inputElement) => {
    const message = inputElement.value;
    inputElement.value = '';
    sendMessage(message).then(watchMessageUpdates);
});

watchMessageUpdates();