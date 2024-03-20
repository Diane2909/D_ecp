const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const User = require ('./usermodel');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Échec de la connexion à MongoDB', err));


const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }});

let onlineUsers = {};

app.use(express.json());
app.use(express.static('public'));

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

async function getUsernameById(userId) {
    try {
        const user = await User.findById(userId);
        return user ? user.username : 'UnknownUser';
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return 'UnknownUser';
    }
}

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('authenticate', async ({ userId }) => {
        const username = await getUsernameById(userId);
        
        
        if (onlineUsers[userId]) {
            const oldSocket = io.sockets.sockets.get(onlineUsers[userId].socketId);
            if (oldSocket) {
                oldSocket.disconnect(true);
            }
        }

        
        onlineUsers[userId] = { socketId: socket.id, username };
        console.log(`User authenticated: ${username} with socket ID: ${socket.id}`);
    });

    socket.on('disconnect', () => {
        Object.keys(onlineUsers).forEach(userId => {
            if (onlineUsers[userId].socketId === socket.id) {
                console.log(`User ${userId} disconnected`);
                delete onlineUsers[userId];
            }
        });
    });

    socket.on('init_chat', async (data) => {
        const user1Id = data.user1;
        const user2Id = data.user2;

        const user1Name = await getUsernameById(user1Id);
        const user2Name = await getUsernameById(user2Id);

        const chatRoomName = [user1Id, user2Id].sort().join('&');

        socket.join(chatRoomName);
        console.log(`Chat room created: ${chatRoomName}`);

        io.to(chatRoomName).emit('chat_init', { room: chatRoomName });
    });

    socket.on('join room', (room) => {
        socket.join(room);
        console.log(`User ${userId} joined the room: ${room}`);
    });

    socket.on('chat message', (msg, room) => {
        io.to(room).emit('chat message', msg, userId);
        console.log(`Message in ${room} from ${userId}: ${msg}`);
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});
