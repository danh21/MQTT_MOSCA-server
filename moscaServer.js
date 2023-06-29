var mosca = require('mosca');   // Khai báo biến mosca sử dụng các thuộc tính của module mosca

var settings = {
  port: 1883,          // port kết nối đến server
};

// Lệnh tạo server sử dụng mosca
var server = new mosca.Server(settings);

var mongo = require('mongodb')
var mongc = mongo.MongoClient
var url = 'mongodb://localhost:27017/mqtt'

server.on('ready', ()=>{
    console.log('Broker is ready!')
})

// In ra dòng chữ client connected và id của client khi có sự kiện client kết nối thành công đến server
server.on('clientConnected', function(client) {
    console.log(client.id, 'connected');
});

// In ra dòng chữ client disconnected và id của client khi có sự kiện client ngắt kết nối với server
server.on('clientDisconnected', function(client) {
    console.log(client.id, 'disconnected');
});

// In ra message của client gửi ở dạng string khi có sự kiện client publish 1 message
server.on('published', function(packet, client) {
    console.log('Published', packet.payload.toString());
    // message = packet.payload.toString()
    // console.log(message)
    // if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
    //     mongc.connect(url, (error, client)=>{
    //         var myCol = client.db('mqttJS').collection('mqttJS')
    //         myCol.insertOne({
    //             message: message
    //         }, ()=>{
    //             console.log('Data is saved to MongoDB')
    //             client.close()
    //         })
    //     })
    // }
});