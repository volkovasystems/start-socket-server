var startSocketServer = function startSocketServer( host, port, channelSet, boundProxyServerURL ){

	server.listen(port,host);

	io.on( "connection", function onConnection( socket ){
		socket.on( "command", function onCommand( command ){
			console.log( "@cli:"+command );
		} );
	} );

};

var app = require( "express" )( );
var server = require( "http" ).Server( app) ;
var io = require( "socket.io" )( server );

exports.startSocketServer = startSocketServer;

startSocketServer("127.0.0.1","3000","","");