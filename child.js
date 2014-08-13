var socket = require( "socket.io-client" )( "http://127.0.0.1:3000" );

socket.connect();

socket.on( "connect", function onConnect( ){
  console.log( "connected to server!" );
} );

  socket.on( "disconnect", function onDisconnect( ){
    console.log( "You are disconnected from server." );
  } );