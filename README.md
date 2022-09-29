You can use your LaserGRBL to send G-code command to a Wifi websocket.

This can be usefull if you don't want your Laser Cutter to be in the same room than your computer. 
As LaserGrbl is not so user friendly with Linux (or Raspbian) on a Raspberry PI, you can use your Raspberry Pi as a remote access from LaserGrbl.

# SerialWebsocketJS
## A transparent node.js: Websocket <-> Serial Port Bridge
## For Usage with LaserGRBL

This program send G-code to serial USB. It analys message from LaserGRBL and can execute Python script when G-Code instructions are send from LaserGRBL. 

Actually :
- M8 -> will launch python code fan_ON.py (to turn fan ON )
- M9 -> will launch python code fan_OFF.py (to turn fan OFF )

## Reference
https://lasergrbl.com/usage/wifi-with-esp8266/

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
