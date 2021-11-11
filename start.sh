#!/bin/bash
cd /home/ryan/thinker/
screen -dmS node bash -c "node ~/thinker/index.js; exec sh"
screen -dmS chromium bash -c "chromium-browser --autoplay-policy=no-user-gesture-required --kiosk --app=http://localhost/animation; exec sh"
#screen -dmS nodogsplash bash -c "sudo nodogsplash; exec sh"
