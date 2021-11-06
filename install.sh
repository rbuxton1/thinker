#!/bin/bash
headless=
# Process commands
while [ "$1" != "" ]; do
  case $1 in
    -h | --headless )
      headless=1
      shift
      ;;
    * )
      echo "Unrecognized commands!"
      exit 1
      shift
  esac
  shift
done

echo "Updating software . . ."
sudo apt-get update
sudo apt-get upgrade
sudo apt install git libmicrohttpd-dev screen nodejs chromium-browser npm

#Install RaspAP
echo "Installing RaspAP . . ."
curl -sL https://install.raspap.com | bash

#Install Node packages
echo "Installing NodeJS packages . . ."
npm install

#Copy configuration files
echo "Copying configuration files . . ."
# Make backups just incase
#sudo cp /etc/nodogsplash/nodogsplash.conf /etc/nodogsplash/nodogsplash.conf.original
#sudo cp /etc/nodogsplash/htdocs/splash.html /etc/nodogsplash/htdocs/splash.html.original
#Move the working ones into place
#sudo cp setup/nodogsplash.conf /etc/nodogsplash/nodogsplash.conf
#sudo cp setup/splash.html /etc/nodogsplash/htdocs/splash.html
if [ "$headless" != "1"]; then
  mkdir -p ~/.config/autostart
  cp setup/Kiosk.desktop ~/.config/autostart
fi


#Done!
echo "Done!"
