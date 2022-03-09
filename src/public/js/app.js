const socket = io();

const welcom = document.getElementById("welcome");
const form = welcom.querySelector("form");

function backendDone(msg) {
    console.log(`backend said: ${msg}`);
}


function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, backendDone);
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
