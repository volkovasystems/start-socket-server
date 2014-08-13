var io = require( "socket.io-client" );

var command = io.connect( "http://127.0.0.1:3000/command" );


command.on( "cli", function onCommand( command ){
	console.log("@cli:"+command);
} );

command.emit( "cli", "command" );

command.on( "disconnect", function onDisconnect( ){
	console.log( "You are disconnected from server." );
} );

