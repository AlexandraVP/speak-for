const messagesContainerElement = document.getElementById('messagesContainer');
const messageInputElement = document.getElementById('messageInput');
const sendButtonElement = document.getElementById('sendButton');

export function appendMessageElements(newMessages) {
    newMessages.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messagesContainerElement.appendChild(messageElement);
    });
}

export function subscribeInput(callback){
    sendButtonElement.addEventListener("click",() => {
        callback(messageInputElement.value);
    });
}