var app = require( "express" )( );
var server = require( "http" ).Server( app );
var io = require( "socket.io" )( server );

var startSocketServer = function startSocketServer( host, port, channelSet, boundProxyServerURL ){

	server.listen( port, host );

	var childrenList = { };

	server.on ( "listening", function onListen( ){
		console.log ("Server Online: listening on " + host + ":" + port );
	} );

	app.get( "/", function onGet( request, response ){
		response.sendFile( __dirname + "/index.html" );
	} );

	app.use( function onError( error, request, respo , next ){
		console.error( error.stack );
		response.send( 500, "Internal Server Error!" );
	} );


	io.on( "connection", function onConnection( socket ){
		console.log( "Child connected" );

		socket.emit( "call", { message: "Hello child" } );

		socket.on( "callback", function onCallback( message ){
			console.log( message );

			socket.emit( "introduce", { message: "who are you?" } );
		} );

		socket.on( "introduction", function onIntroduction( message ){
			childrenList[ socket.id ] = message;
			console.log( "I am ", message );
			console.log( "ChildrenList: ", childrenList );
		} );

		socket.on( "disconnect", function onDisconnect( ){
			console.log( "Child disconnected: " );
			console.log( JSON.parse(childrenList[ socket.id ]) + " has left the grid." );
			delete childrenList[ socket.id ];
			console.log( "Current ChildrenList: ", childrenList );
		} );

	} );	
};
exports.startSocketServer = startSocketServer;

startSocketServer("127.0.0.1","8080","","");