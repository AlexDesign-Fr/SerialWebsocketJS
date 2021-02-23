const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 81 });




function sendSerial(message) {
  console.log(message);
}


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
    sendSerial(message);
  });

  ws.send('Connected');
});

// TODO:
// 1. Make configurable
// 2. define decode function
// 3. define serial event function