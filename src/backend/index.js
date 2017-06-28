const WebSocketServer = require('websocket').server;
const http = require('http');
const uuid = require('uuid/v4');

const server = http.createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

server.listen(8000, () =>
  console.log('WebSocket server is listening on port 8000')
);

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});
const store = {
   connections: new Set(),
   messages: []
};

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);

  store.connections.add(connection);

  connection.sendUTF(
    JSON.stringify({
      type: 'LOAD_MESSAGES',
      messages: store.messages
    })
  );

  connection.on('message', (data) => {
    if (data.type !== 'utf8') {
      return;
    }

    const message = JSON.parse(data.utf8Data);    
    message.id = uuid();
    message.date = new Date();

    store.messages.push(message);
    store.connections.forEach((c) => {
      c.sendUTF(
        JSON.stringify({
          type: 'APPEND_MESSAGE',
          message
        })
      );
    });
  });

  connection.on('close', (reasonCode, description) => {
    store.connections.delete(connection);
  });
});
