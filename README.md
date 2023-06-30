# MQTT_MOSCA-server

# Description:
    - This system includes 1 Broker (MOSCA server) and 2 Clients (Client using ESP8266 and Client using javascript).
    - Mosca broker broadcasts messages to clients.
    - ESP8266 Client subcribes "status of led" topic to control led on board, publishes on "connection of board" topic to notify.
    - JS Client subcribes "connection of board" topic to receive message about connection of board, publishes on "status of led" topic to control led.

# Software:
    - Arduino IDE (programming for microcontroller)
    - MQTT Lens (Chrome Extensions) or MQTT Client (app in CHPlay): check connection to MQTT broker and operation of messages
    - Visual Studio Code: runs broker and client

# Code:
    - ESP8266_Client.ino:
        + Modify Wifi information
        + Modify MQTT server (your local IP) and port
    - moscaClient.js
        + Modify MQTT server (your local IP) and port