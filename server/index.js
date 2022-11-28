const http = require('http');

const express = require('express');
const { Server } = require("socket.io");

const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.SERVER_PORT || 3001;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(pino);

if (process.env.SERVER_ENV === 'production') {
    app.use(express.static('build'));
};

app.post('/api/login', (req, res) => {
    if(req.body.email === 'thais@email.com' && req.body.password === '123') {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({  token: 123 }));
    }
});

app.get('/api/me', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ name: 'Thais', role: 'admin' }));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('pedido', (data) => {
        io.emit('pedido', data);
    });

    socket.on('pedido-mesa', (data) => {
        io.emit('pedido-mesa', data);
    });

    socket.on('atendente-mesa', (data) => {
        io.emit('atendente-mesa', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Coffeeshop-buso API running on port ${port}!`);
});