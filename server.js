const net = require('net');
const Player = require('./models/player')
const Game = require('./models/game')
let clientList = []
let game = null
const server = net.createServer((socket) => {
  const connection = `${socket.remoteAddress}:${socket.remotePort}`
  console.log(`Opened connection ${connection}`);
  if(game === null) {
    // first connection
    game = new Game()
    game.playerOne = new Player(game, socket, 'playerOne')
    console.log('Player 1 connected to the game');
  } else if (game.currentPlayers() < 2) {
    // second connection
    game.playerTwo = new Player(game, socket, 'playerTwo')
    console.log('Player 2 connected to the game');
    game.playerOne.send('Player 2 connected to the game')
  } else {
    // cannot accept third connection
    console.log(`Closed connection ${connection}`);
    return socket.end('fs')
  }
  

  socket.on('end', () => {
    console.log(`Closed connection ${connection}`);
    if(game.playerOne.socket === socket) {
      if(game.currentPlayers() == 1 ) {
        console.log('All players left, close game');
        game = null
      } else {
        console.log('Player 1 disconnected, Player 2 now become Player 1')
        game.playerOne = game.playerTwo
        game.playerOne.name = 'playerOne'
        game.playerTwo = null
        game.started = false
        game.playerOne.send('Player 1 disconnected, you now become Player 1')
      }
    } else if (game.playerTwo.socket === socket) {
      console.log('Player 2 disconnected')
      game.playerOne.send('Player 2 disconnected')
      game.playerTwo = null
      game.isStarted = false
    }
    
  });
  
});

//server.maxConnections = 2;
server.listen(9000);