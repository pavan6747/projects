// clientNamespaceController.js
const clientController = (socket, clientNamespace, executiveNamespace) => {
  console.log('Client connected');

  // Listen for chat messages from the client
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients in the client namespace
    clientNamespace.emit('chat message', 'Client: ' + msg);

    // Broadcast the message to all connected executives in the executive namespace
    executiveNamespace.emit('chat message', 'Client: ' + msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
};

module.exports = clientController;
