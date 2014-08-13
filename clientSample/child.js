var socket = require( "socket.io-client" )( "http://127.0.0.1:8080" );

socket.connect();

socket.on( "connect", function onConnect( ){
  console.log( "connected to server!" );

  socket.on( "call", function onCall( message ){
    console.log( message );

    socket.emit( "callback", { message: "Hello parent" } );
  } );

  socket.on( "introduce", function onIntroduction( message ){
    console.log( message );

    var specsObject = { "uuid": "myUniqueID" };
    console.log( "I am ", specsObject.uuid );

    socket.emit( "introduction", { message: specsObject.uuid } );
  } );

  socket.on( "disconnect", function onDisconnect( ){
    console.log( "You are disconnected from server." );
  } );
} );