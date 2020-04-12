let socket;
let room;

function connect() {
    room = document.getElementById('room').value;
    if (socket && socket.connected) {
        socket.disconnect();
    }
    socket = io('http://localhost:3000', { query: { room }});

    socket.on('response', renderMessage);
}

function sendMessage(event) {
    event.preventDefault();

    const user = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    socket.emit('message', { user, message });
}

function renderMessage(data) {
    document.getElementById('messages').innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;
}

function load() {
    document.getElementById('connect').addEventListener('click', connect);
    document.getElementById('chat').addEventListener('submit', sendMessage);
}

document.addEventListener("DOMContentLoaded", load, false);