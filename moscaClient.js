// Khai báo biến mqtt để sử dụng các thuộc tính thuộc module mqtt
var mqtt = require('mqtt');

// Tạo 1 kết nối đến địa chỉ 192.168.1.7 port 1883 thông qua giao thức MQTT
var client  = mqtt.connect('mqtt://192.168.0.105:1883');

client.on('connect', function () {
  client.subscribe('ESP8266/connection/board');
  client.publish('ESP8266/LED/status', 'on');
})

// Khi có message gửi đến client, client sẽ chuyển đổi dữ liệu từ Buffer sang dạng String và in ra màn
// hình console dữ liệu nhận được và đóng kết nối.
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  //client.end();
})