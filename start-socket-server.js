var startSocketServer = function startSocketServer( host, port, channelSet, boundProxyServerURL ){

				
		app.use( function onUse( request, response, next ){
			if (!( /command/.test( request.url ) ) ){
				next ( proxy.web( request, response, { target: "http://127.0.0.1:8000/command" } ) );
			}else{				
				//for testing
				response.writeHead(200, { "Content-Type": "text/plain" } );
				response.end( "request to server successful" + "\n" + JSON.stringify( request.headers, true, 2) );
			}
		} );

		var command = io
		.of( "/command" )
		.on( "connection",
			function onConnect( socket ){
				socket.on( "cli", function onCommand( command ){
					console.log("@cli:"+command);
				} );

				command.emit( "cli", "command" );
			} );

		server.listen( port, host );
		var proxy = proxyServer( "127.0.0.1","9000","" );
};

var app = require( "express" )( );
var server = require( "http" ).Server( app );
var io = require( "socket.io" )( server );

var proxyServer = require( "../start-proxy-server/start-proxy-server.js" ).startProxyServer;

exports.startSocketServer = startSocketServer;
	
startSocketServer("127.0.0.1","9000","","");