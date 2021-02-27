# SerialWebsocketJS
## A transparent node.js: Websocket <-> Serial Port Bridge

## Install
### Install latest Node.js
- `sudo apt remove nodered -y`
- `sudo apt remove nodejs nodejs-legacy -y`
- `curl -L https://git.io/n-install | bash`
### Install SerialWebsocketJS
- `cd /home/pi/Documents/` (choose location)
- `git clone https://github.com/Apology11/SerialWebsocketJS`
- `cd serialwebsocketjs`
- `npm install`
### Add Autostart
- `sudo nano /etc/rc.local`
- add to autostart (adapt location and log location to your liking)
- add `/home/pi/n/bin/node /home/pi/Documents/serialwebsocketjs/serialwebsocket.js > /home/pi/Documents/sws.log &`
