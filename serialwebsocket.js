const WebSocket = require('ws');
const SerialPort = require('serialport')

const wss = new WebSocket.Server({ port: 1024 });
const port = new SerialPort('/dev/ttyACM0', {baudRate: 115200});

const prnt_dbg = true;

// TODO:
// 1. Make configurable
// 2. define decode function
// 3. Handle reconnect/connect during runtime

// foreward WS event -> Serial Port
// TODO: decode special commands
function sendSerial(message) {
  port.write(message);
}

// broadcast Serial Port -> all WS clients
async function sendWS(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// handle available Serial data
port.on('readable', function () {
  dat = port.read()
  sendWS(dat.toString());
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

// handle WS connection
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) { 
    sendSerial(message);
  });
  
  ws.on('error', function(e){
    console.log(`Received Error: ${e}`);
  });

  ws.send('Connected');
});