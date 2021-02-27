# SerialWebsocketJS
## A transparent node.js: Websocket <-> Serial Port Bridge

## Install
### Install latest Node.js
- `apt-get remove nodered -y`
- `apt-get remove nodejs nodejs-legacy -y`
- `curl -L https://git.io/n-install | bash`
### Install SerialWebsocketJS
- `cd /home/pi/Documents/` (choose location)
- `git clone *this repo*` (replace with this repo linking)
- `npm install`
### Add Autostart
- `sudo nano /etc/rc.local`
- add to autostart (adapt location and log location to your liking)
- add `/home/pi/n/bin/node /home/pi/Documents/serialwebsocketjs/serialwebsocket.js > /home/pi/Documents/sws.log &`