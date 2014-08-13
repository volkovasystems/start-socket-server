var app = require( "express" )( );
var server = require( "http" ).Server( app );
var io = require( "socket.io" )( server );

var startSocketServer = function startSocketServer( host, port, channelSet, boundProxyServerURL ){

	server.listen( port, host );

	server.on ( "listening", function onListen( ){
		console.log ("Server Online: listening on " + host + ":" + port );
	} );

	io.on( "connection", function onConnection( socket ){
		console.log( socket.id + ":connected" );

		socket.on( "disconnect", function onDisconnect( ){
			console.log( socket.id  + " disconnected." );
		} );

	} );	
};
exports.startSocketServer = startSocketServer;

startSocketServer("127.0.0.1","3000","","");