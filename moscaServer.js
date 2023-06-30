var mosca = require('mosca');  

var settings = {
  port: 1883,          
};

var server = new mosca.Server(settings);

var mongo = require('mongodb')
var mongc = mongo.MongoClient
var url = 'mongodb://localhost:27017/mqtt'



server.on('ready', ()=>{
    console.log('Broker is ready!')
})

// When client connects to broker
server.on('clientConnected', function(client) {
    console.log(client.id, 'connected');
});

// When client disconnects to broker
server.on('clientDisconnected', function(client) {
    console.log(client.id, 'disconnected');
});

// Display publish events
server.on('published', function(packet, client) {
    console.log('Published', packet.payload.toString());
});