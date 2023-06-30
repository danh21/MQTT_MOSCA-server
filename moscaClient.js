var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://192.168.0.105:1883');

client.on('connect', function () {
  client.subscribe('ESP8266/connection/board');   // receive connection message from ESP
  client.publish('ESP8266/LED/status', 'on');     // control led on
})

client.on('message', function (topic, message) {
  console.log(message.toString());
})