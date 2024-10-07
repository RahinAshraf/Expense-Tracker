const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

// Create an Express application
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware for logging requests
app.use(morgan('dev'));

// Middleware for security headers
app.use(helmet());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users and their rooms
const users = {};
const rooms = {};

// Define chat rooms
const defaultRoom = 'General';

// Serve the main chat application page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Join a default room
    socket.join(defaultRoom);
    if (!rooms[defaultRoom]) rooms[defaultRoom] = [];
    rooms[defaultRoom].push(socket.id);
    
    // Handle joining a specific room
    socket.on('join room', (roomName) => {
        socket.leave(defaultRoom); // Leave the default room
        socket.join(roomName);
        if (!rooms[roomName]) rooms[roomName] = [];
        rooms[roomName].push(socket.id);
        console.log(`User ${socket.id} joined room: ${roomName}`);
        socket.emit('room joined', roomName);
        io.to(roomName).emit('chat message', `${socket.id} has joined the room.`);
    });

    // Handle sending chat messages
    socket.on('chat message', (msg) => {
        const roomName = Object.keys(socket.rooms).find(room => room !== socket.id);
        if (roomName) {
            io.to(roomName).emit('chat message', { id: socket.id, message: msg });
            console.log(`Message from ${socket.id} in ${roomName}: ${msg}`);
        }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        // Remove user from all rooms
        for (const room in rooms) {
            rooms[room] = rooms[room].filter(id => id !== socket.id);
            if (rooms[room].length === 0) delete rooms[room]; // Remove empty rooms
        }
        io.emit('chat message', `${socket.id} has left the chat.`);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serve a 404 error for unmatched routes
app.use((req, res) => {
    res.status(404).send('Sorry, that route does not exist!');
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
