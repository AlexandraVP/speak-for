
submit.addEventListener("click", ()=> {

    sendMessage(message.value)
        .then(getMessages)
        .then((d) => fieldOutput.innerHTML = d.join('<br/>'));
    //let newP = document.createElement("p");
    ///newP.textContent=message.value;
    //fieldOutput.appendChild(newP);
});

getMessages().then((d) => fieldOutput.innerHTML = d.join('<br/>'))

let interval = setInterval(function(){
    getMessages().then((d) => fieldOutput.innerHTML = d.join('<br/>'))
},1000);

//функция отправ сообщения на сервер
function sendMessage(text){
    return fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({text: text})
    }).then(d=>d.json());
}

function getMessages() {
    return fetch('/messages').then(d=>d.json());
}