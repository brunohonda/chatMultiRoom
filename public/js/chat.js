let socket;
let user;

function showTab(tabId) {
    $('.tab-pane').removeClass('active show');
    $(`#${tabId}`).addClass('active show');
}

function connect(event) {
    event.preventDefault();
    
    const room = document.getElementById('room').value;
    user = document.getElementById('username').value;

    if (socket && socket.connected) {
        socket.disconnect();
    }
    socket = io('http://localhost:3000', { query: { room }});

    socket.on('response', renderMessage);

    showTab('chat-tab');
}

function sendMessage(event) {
    event.preventDefault();

    const message = document.getElementById('message').value;

    socket.emit('message', { user, message });
    document.getElementById('message').value = '';
}

function renderMessage(data) {
    $('#messages').append(`
    <div class="media m-3">
        <img class="avatar rounded-circle mr-3" src="https://picsum.photos/200" alt="Avatar">
        <div class="media-body">
            <h5 class="mt-0">${data.user}</h5>
            ${data.message}
        </div>
    </div>
    `);
}

function load() {
    document.getElementById('connect').addEventListener('submit', connect);
    document.getElementById('chat').addEventListener('submit', sendMessage);
    showTab('login-tab');
}

document.addEventListener("DOMContentLoaded", load, false);