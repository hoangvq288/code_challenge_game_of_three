const GameLogic = require('../game_logic')
const Services = require('../services')
class Player {
  constructor(game, socket, name) {
    this.socket = socket
    this.name = name
    this.isManually = true
    this.setOpponent(game)
    
    socket.on('data', (buffer) => {
      const { command, value } = Services.handleCommand(buffer)
      this.handleCommand(game, command, value)
    })
    
  }

  setOpponent(game) {
    if(game.playerOne) {
      this.opponent = game.playerOne
      this.opponent.opponent = this
    } else if (game.playerTwo) {
      this.opponent = game.playerTwo
      this.opponent.opponent = this
    }
  }

  handleCommand(game, command, value) {
    switch(command) {
      case 'START':
        this.startGame(game)
        break;
      case 'QUIT':
        this.quitGame()
        break;
      case 'ADD':
        if(this.notAllowToPlay(game, value)) return this.send('You cannot use this command.')

        this.playGame(game, value)
        break;
      case 'STATUS':
        if(!game.isStarted) return this.send('Game did not start yet')

        this.send(game.getStatus())
        break;
      case 'AUTO':
        if(game.isStarted) return this.send('Sorry, can only set Auto Mode before the game.')

        this.setPlayAuto()

        if(game.isFull() && !this.opponent.isManually) {
          game.startAutoMode(this, this.opponent)
        }
        break;
      default:
        this.invalidCommandMessage()
    }
  }

  startGame(game) {
    if(!game.isFull()) return this.send('Cannot start the game, you should wait one more person.')
    if(game.isStarted) {
      this.send('Game is already started')
      this.send(`Your opponent is: ${this.opponent.name}`)
    } else {
      game.startGame(this)
      if(this.isManually && !this.opponent.isManually) {
        this.opponent.playGame(game, this.opponent.guessValue(game.input))
      }
    }
  }

  playGame(game, value) {
    game.updateTurn(this, value)

    if(game.isFinish()) {
      game.closeGame(this, value)
    } else {
      game.informState(this, value)
    }

    if(this.isManually && !this.opponent.isManually && !game.isFinish()) {
      this.opponent.playGame(game, this.opponent.guessValue(game.roundValue))
    }
  }

  quitGame() {
    return this.socket.end('quit')
  }

  notAllowToPlay(game, value) {
    return !game.isStarted || game.invalidTurn(this) || isNaN(value) || !game.isValidNumber(value)
  }

  setPlayAuto() {
    this.isManually = false
    this.send('auto')
  }

  guessValue(input) {
    return GameLogic.options.find(option => GameLogic.isDivisible(input + option))
  }

  invalidCommandMessage() {
    return this.send('Invalid Command')
  }

  send(message) {
    this.socket.write(`${message}\n`)
  }
}

module.exports = Player