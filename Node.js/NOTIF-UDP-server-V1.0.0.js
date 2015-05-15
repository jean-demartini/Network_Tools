var PORT = 5001;
var HOST = '192.168.1.86';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('Server UDP listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log('Notification UDP from: ' + remote.address + ':' + remote.port +' - ' + message);

});

server.bind(PORT, HOST);
