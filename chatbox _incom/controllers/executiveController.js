// executiveController.js
const executiveController = (socket, executiveNamespace, clientNamespace) => {
  console.log('Executive connected');

  // Listen for chat messages from the executive
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected executives in the executive namespace
    executiveNamespace.emit('chat message', 'Executive: ' + msg);

    // Broadcast the message to all connected clients in the client namespace
    clientNamespace.emit('chat message', 'Executive: ' + msg);
  });

  // Listen for data update from the executive
  socket.on('updateData', (data) => {
    // Broadcast the data to all connected clients in the client namespace
    clientNamespace.emit('updateData', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Executive disconnected');
  });
};

module.exports = executiveController;
