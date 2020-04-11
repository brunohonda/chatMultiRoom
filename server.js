const express = require('express');

const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);

app.listen(3000);

socket.onconnection(console.log);