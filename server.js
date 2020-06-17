const net = require('net');
const Game = require('./models/game')
const Services = require('./services')
const PORT_NUMBER = process.env.PORT || 9000

let game = null

const server = net.createServer((socket) => {
  const connection = `${socket.remoteAddress}:${socket.remotePort}`
  Services.addInfo(`Opened connection ${connection}`);
  if(game === null) {
    // first connection
    game = new Game()
    game.addPlayerOne(socket, 'playerOne')
    Services.addInfo(`${game.playerOne.name} connected to the game`);
  } else if(game.isFull()) {
    // cannot accept third connection
    Services.addWarning(`Closed connection ${connection}. Violate game rules.`)
    return socket.end('fs')
  } else {
    // second connection
    if(game.playerOne) {
      game.addPlayerTwo(socket, 'playerTwo')
      Services.addInfo(`${game.playerTwo.name} connected to the game`);
    } else {
      game.addPlayerOne(socket, 'playerOne')
      Services.addInfo(`${game.playerOne.name} connected to the game`);
    }
  }

  socket.on('end', () => {
    Services.addInfo(`Closed connection ${connection}`);
    if(game.playerOne && game.playerOne.socket === socket) {
      Services.addInfo(`${game.playerOne.name} disconnected from Server`)
      game.informPlayer(game.playerTwo, `${game.playerOne.name} is disconnected`)
      game.onDisconnect(game.playerOne)
    } else {
      Services.addInfo(`${game.playerTwo.name} disconnected from Server`)
      game.informPlayer(game.playerOne, `${game.playerTwo.name} is disconnected`)
      game.onDisconnect(game.playerTwo)
    }
    if(game.isEmpty()) {
      Services.addInfo('All players left, close game.');
      game = null
    }
  });

  socket.on('error', (err) => {
    Services.addWarning(err)
    Services.addWarning('Client should reconnect to play game.')
  })
});

//server.maxConnections = 2;
server.listen(PORT_NUMBER, () => {
  Services.addInfo(`Started server for Game of Three PORT:${PORT_NUMBER}`)
});