const WebSocket = require('ws');
const SerialPort = require('serialport')

const wss = new WebSocket.Server({ port: 1024 });
const port = new SerialPort('/dev/ttyACM0', {baudRate: 115200});

const serial_retry = 5000; // retry interval for serial connection in milliseconds

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
  //console.log('Error: ', err.message)
  sendWS('Laser powered off or disconnected');
  setTimeout(openSerial, serial_retry);
})

// Handle disconnect
port.on('close', function(err) {
  sendWS('Serial Port disconnected.');
  sendWS('Trying to open Serial Port ...');
  setTimeout(openSerial, serial_retry);
})

// handle WS connection
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) { 
    sendSerial(message);
  });
  
  //ws connection errors are ignored (cannot be resolved anyway)
  //ws.on('error', function(e){
    //console.log(`Received Error: ${e}`);
  //});

  ws.send('Connected');
  if (!port.isOpen) {
    ws.send('Trying to open Serial Port ...');
  }
});

// try to connect to serial
function openSerial(){
  if (port.isOpen) {
    return;
  }  
  port.open(function (err) {
    if (err) {
      //console.log('Error opening port: ', err.message)      
      sendWS('Laser powered off or disconnected');
      setTimeout(openSerial, serial_retry);
    }
  });
}