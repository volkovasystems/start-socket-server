var startSocketServer = function startSocketServer( host, port, channelSet, boundProxyServerURL ){

	server.listen( port, host);

	var command = io
	.of( "/command" )
	.on( "connection",
		function onConnect( socket ){
			socket.on( "cli", function onCommand( command ){
				console.log("@cli:"+command);
			} );

			command.emit( "cli", "command" );
		} );
};

var app = require( "express" )( );
var server = require( "http" ).Server( app );
var io = require( "socket.io" )( server );

exports.startSocketServer = startSocketServer;

startSocketServer("127.0.0.1","3000","","");