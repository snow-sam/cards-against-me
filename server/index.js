import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "*" });


const getQuestion = async () => {
    const questions = path.join(process.cwd(), '../public', 'arq.json');
    try {
      const data = await fs.readFile(questions, 'utf8');
      const dataJson = JSON.parse(data);
      return dataJson;
    } catch (error) {
      console.error('Error reading the JSON file:', error);
      return '';
    }
}


class Stack {
    constructor(initialItems = []) {
        this.items = initialItems;
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.isEmpty()) {
            return "Underflow"; // Pilha vazia
        }
        return this.items.pop();
    }
    peek() {
        if (this.isEmpty()) {
            return "No elements in Stack";
        }
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
    printStack() {
        console.log(this.items.join(" "));
    }
}

class Player {
    constructor(id, question, cards = []) {
        this.id = id
        this.cards = cards
        this.blackCards = 0
        this.question = question
    }
    win() {
        this.blackCards++
    }
}

class Round {
    constructor(cards = [], votes = []) {
        this.cards = cards
        this.votes = votes
    }

    getWinner() {
        const voteCount = this.votes.reduce((acc, playerId) => {
            acc[playerId] = (acc[playerId] || 0) + 1;
            return acc;
        }, {});

        let maxVotes = 0;

        for (const count of Object.values(voteCount)) {
            if (count > maxVotes) {
                maxVotes = count;
            }
        }

        return Object.entries(voteCount)
            .filter(([playerId, count]) => count === maxVotes)
            .map((playerId) => playerId);
    }

    vote(playerId){
        this.votes.push(playerId)
    }

    pushCard(card){
        this.cards.push(card)
    }

    canVote(playersLength){
        return this.cards.length === playersLength
    }

    isFinished(playersLength){
        return this.votes.length === playersLength
    }
}

const sala = {
    // Preencher Decks
    DeckWhite: new Stack(await getQuestion()),
    DeckBlack: new Stack(["Pgt1", "Pgt2", "Pgt3", "Pgt4", "Pgt5"]),
    Players: {},
    Rounds: [new Round()]
}

// Quando um cliente se conectar
io.on('connection', (socket) => {
    console.log('Um cliente se conectou');
    const playerCards = []
    for (let i = 0; i < 10; i++) {
        if (!sala.DeckWhite.isEmpty()) {
            playerCards.push(sala.DeckWhite.pop());
        } else {
            break; // Parar se a pilha estiver vazia antes de remover os 10 itens
        }
    }

    socket.data = new Player(socket.id, sala.DeckBlack.peek(), playerCards)
    sala.Players[socket.data.id] = socket.data
    // Dar Cartas

    console.log(sala)

    socket.on('_getData', (callback) => {
        callback(sala.Players[socket.data.id])
    });

    socket.on('sendCard', (card) => {
        console.log('Jogador', socket.data.id, ' mandou a carta: ', card);
        const currentRound = sala.Rounds[sala.Rounds.length - 1]
        currentRound.pushCard({card, playerId: socket.data.id})
        sala.Players[socket.data.id].cards = sala.Players[socket.data.id].cards.filter(item => item !== card)
        sala.Players[socket.data.id].cards.push(sala.DeckWhite.pop())
        console.log(sala)
        if (currentRound.canVote(Object.keys(sala.Players).length))
            io.emit("vote", currentRound.cards)
    });

    socket.on('vote_', (card) => {
        console.log('Jogador', card.playerId, ' votou na carta: ', card.card)
        const currentRound = sala.Rounds[sala.Rounds.length - 1]
        currentRound.vote(card.playerId)
        if (currentRound.isFinished(Object.keys(sala.Players).length)) {
            io.emit("reset", currentRound.getWinner())
            sala.Rounds.push(new Round())
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        delete sala.Players[socket.data.id]
    });
});


// Servidor ouvindo na porta 4000 no IP 192.168.15.19
const PORT = 4000;
const HOST = '192.168.15.19';

server.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
