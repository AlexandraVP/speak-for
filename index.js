
submit.addEventListener("click", ()=> {

    let newP = document.createElement("p");
    newP.textContent=message.value;
    fieldOutput.appendChild(newP);

});