var net = require('net');

var HOST = '192.168.1.86';
var PORT = 5001;

// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    var ra = sock.remoteAddress;
    var rp = sock.remotePort;
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTION initiated by: ' + ra +':'+ rp);
    sock.write('Server response');
     
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA from ' + ra + ':' + rp + ' = ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('Server have received "' + data + '"');
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED by: ' + ra +':'+ rp);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
