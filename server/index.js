import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "*" });


const sala = {}

// Quando um cliente se conectar
io.on('connection', (socket) => {
    console.log('Um cliente se conectou');
    sala[socket.id] = null
    console.log(sala)

    socket.on('sendCard', (card) => {
        console.log('Uma carta foi enviada: ', card);
        sala[socket.id] = card
        console.log(sala)
        if (Object.values(sala).every(item => item !== null))
            io.emit("vote", Object.values(sala))
    });

    socket.on('vote_', (card) => {
        console.log('Uma carta foi votada: ', socket.id, card);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        delete sala[socket.id]
    });
});


// Servidor ouvindo na porta 4000 no IP 192.168.15.19
const PORT = 4000;
const HOST = '192.168.15.19';

server.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
