export function sendMessage(text){
    return fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({text: text})
    }).then(d=>d.json());
}

export function getMessages(from) {
    return fetch(`/messages?from=${from}`).then(d=>d.json());
}

