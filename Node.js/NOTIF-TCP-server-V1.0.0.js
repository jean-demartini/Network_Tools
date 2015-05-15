var net = require('net');

var HOST = '192.168.1.17';
var PORT = 5001;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    var ra = sock.remoteAddress;
    var rp = sock.remotePort;
    
    sock.setKeepAlive(true);
    
    // We have a connection - a socket object is assigned to the connection automatically
    //console.log('TCP server at: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('Notification TCP from ' + ra + ':' + rp + ' - ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        //sock.write('You said "' + data + '"');
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED by: ' + ra +' '+ rp);
    });
    
    sock.on('end', function(data) {
        console.log('DISCONNECTED by: ' + ra +' '+ rp);
    });
    
    sock.on('error', function(error) {
        console.log(error);
    })
    
}).listen(PORT, HOST);

console.log('Server TCP listening on ' + HOST +':'+ PORT);
