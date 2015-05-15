var PORT  = 5001;
var HOST  = '192.168.1.17';
var zone  = 58;

var dgram = require('dgram');
//var snmp = require('snmp-native');

var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('SNMP-UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (msg, remote) {
    /*
    var frame = '[ ';
    for (var i= 0 ; i<msg.length; i++) {
    	frame = frame+msg[i]+' ';
    }
    */
    var state = (msg[zone + 4])? 'ON' : 'OFF';
		console.log('SNMP Trap from ' + 
										remote.address + 
										':' + remote.port + 
										' @ ' + msg[zone] + 
										' o\'clock - ' +
										state);
});

server.bind(PORT, HOST);
