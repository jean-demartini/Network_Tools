/*
 *	Implementation of a tiny TCP client.
 *
 *	What we have to do to use TCP for alarm notifications
 */

var net = require('net');

var HOST = '192.168.1.74';
var PORT = 5001;

var client = new net.Socket();
client.setTimeout(500);		// ms

client.on('timeout', function() {
		console.log('CLOSE request after timeout');
	  client.end();
});

// Add a 'close' event handler for the client socket
client.on('close', function(error) {
	  if (error) console.log('CLOSED');
});

client.connect(PORT, HOST, function() {
	  console.log('CONNECTION accepted by: ' + HOST + ':' + PORT);
	  /*
	   * Write a message to the socket as soon as the client is connected, 
	   * the server will receive it as message from the client 
	   ******/
	  var msg = 'SENSIVIC 192.168.1.10 5 heures ON';
	  client.write(msg);
	  console.log(msg);	
});

