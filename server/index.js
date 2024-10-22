import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "*" });


const getAnswer = async () => {
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

    clear = () => this.items = []

    isEmpty = () => this.items.length === 0

    peek = () => this.isEmpty() ? "No elements in Stack" : this.items[this.items.length - 1]

    pop = () => this.isEmpty() ? "Underflow" :  this.items.pop()

    printStack = () => console.log(this.items.join(" "));

    push = (element) => this.items.push(element)

    size = () => this.items.length
}

class Player {
    constructor(id, question, cards = []) {
        this.id = id
        this.cards = cards
        this.blackCards = 0
        this.question = question
    }

    changeCard = (oldCard, newCard) => this.cards = [...this.cards, newCard].filter(item => item !== oldCard)

    win = () => this.blackCards++
}

class Round {
    constructor(cards = [], votes = []) {
        this.cards = cards
        this.votes = votes
    }

    getWinner = () => {
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

    isFinished = (playersLength) => this.votes.length === playersLength

    pushCard = (card) => this.cards.push(card)
    
    vote = (playerId) => this.votes.push(playerId)
}

class Room {

    constructor() {
        this.Players = {}
        this.Rounds = [new Round()]
    }

    addPlayer = (playerId) => this.Players[playerId] = new Player(playerId, room.getQuestionCard(), room.pickAnswerCards(10))

    canVote = () => this.getCurrentRound().cards.length == Object.keys(this.Players).length

    fillQuestions = async () => this.DeckBlack = new Stack(["Pgt1", "Pgt2", "Pgt3", "Pgt4", "Pgt5"])

    fillAnswers = async () => this.DeckWhite = new Stack(await getAnswer())

    getCurrentRound = () => this.Rounds[this.Rounds.length - 1]

    getPlayer = (playerId) => this.Players[playerId]

    getPLayersNum = () => Object.keys(this.Players).length

    getQuestionCard = () => this.DeckBlack ? this.DeckBlack.peek() : None

    hasAnswerCards = () => this.DeckWhite && !this.DeckWhite.isEmpty()

    isCurrentRoundFinished = () => this.getCurrentRound().votes.length == Object.keys(this.Players).length

    newRound = () => this.Rounds.push(new Round())
    
    pickAnswerCards = (n_cards) => {
        const cards = []
        for (let i = 0; i < n_cards; i++) {
            if (room.hasAnswerCards()) {
                cards.push(this.DeckWhite.pop());
            } else {
                break;
            }
        }
        return cards
    }
    
    removePlayer = (playerId) => delete this.Players[playerId]
}



const room = new Room()
await room.fillAnswers()
await room.fillQuestions()


// Quando um cliente se conectar
io.on('connection', (socket) => {

    room.addPlayer(socket.id)
    socket.data = room.getPlayer(socket.id)

    console.log(room)

    socket.on('_getData', (callback) => callback(room.getPlayer(socket.data.id)));

    socket.on('sendCard', (card) => {
        const player = room.getPlayer(socket.data.id)
        const currentRound = room.getCurrentRound()
        currentRound.pushCard({card, playerId: player.id})

        player.changeCard(card, room.pickAnswerCards(1))

        if (room.canVote())
            io.emit("vote", currentRound.cards)
    });

    socket.on('vote_', (card) => {
        const currentRound = room.getCurrentRound()
        currentRound.vote(card.playerId)
        
        if (room.isCurrentRoundFinished()) {
            io.emit("reset", currentRound.getWinner())
            room.newRound()
        }
    });

    socket.on('disconnect', () => room.removePlayer(socket.data.id));
});

const PORT = 4000;
const HOST = "127.0.0.1";

server.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
