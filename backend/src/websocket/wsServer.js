const WebSocket = require('ws');
const logger = require('../config/logger');

let wss;

function initWebSocket(server) {
  wss = new WebSocket.Server({ port:9123 });
  console.log('WebSocket server initialized on port 9123');

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
      console.log('Received:', message);
      ws.send(`Server says: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
}

function broadcastUpdate(type, data) {
  if (!wss) {
    console.error('WebSocket server (wss) is not initialized');
    return;
  }

  const message = JSON.stringify({ type, data });
  console.log('Broadcasting message:', message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log('Message sent to client:', message);
      client.send(message);
    }
  });
}

module.exports = { initWebSocket, broadcastUpdate };
