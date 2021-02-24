const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 81 });

// TODO:
// 1. Make configurable
// 2. define decode function
// 3. define serial event function


// foreward WS event -> Serial Port
// TODO: decode special commands
function sendSerial(message) {
  console.log(message);
}

// broadcast Serial Port -> all WS clients
async function sendWS(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// handle WS connection
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    sendSerial(message);
  });
  ws.send('Connected');
});


// Debug
var dbg_cnt = 0;
function dbg(){
  console.log('Debug called');
  sendWS(`Test ${dbg_cnt}`);
  dbg_cnt++;
  if (dbg_cnt < 90) {    
    setTimeout(dbg, 3000);
  }
}
dbg();