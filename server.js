const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const sockets = require('socket.io')(server);

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

sockets.on('connection', (socket) => {
    socket.join(socket.handshake.query.room);

    socket.on('message', (data) => {
        sockets.to(socket.handshake.query.room).emit('response', data);
    });
});

server.listen(port, () => {
    console.log(`Listen port ${port}`);
});