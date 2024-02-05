// app.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Create namespaces for client and customer executive
const clientNamespace = io.of('/client');
const executiveNamespace = io.of('/executive');

clientNamespace.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for chat messages from the client
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients in the client namespace
    clientNamespace.emit('chat message', 'Client: ' + msg);
  });

  // Listen for data update from the client
  socket.on('updateData', (data) => {
    // Broadcast the data to all connected clients in the executive namespace
    executiveNamespace.emit('updateData', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

executiveNamespace.on('connection', (socket) => {
  console.log('Customer Executive connected');

  // Listen for chat messages from the customer executive
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients in the executive namespace
    executiveNamespace.emit('chat message', 'Customer Executive: ' + msg);

    // Broadcast the message to all connected clients in the client namespace
    clientNamespace.emit('chat message', 'Customer Executive: ' + msg);
  });

  // Listen for data update from the customer executive
  socket.on('updateData', (data) => {
    // Broadcast the data to all connected clients in the client namespace
    clientNamespace.emit('updateData', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Customer Executive disconnected');
  });
});

// Serve different HTML pages for client and customer executive
app.get('/client', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

app.get('/executive', (req, res) => {
  res.sendFile(__dirname + '/executive.html');
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
