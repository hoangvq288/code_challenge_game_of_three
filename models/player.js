const GameLogic = require('../game_logic')
class Player {
  constructor(game, socket, name) {
    this.socket = socket
    this.name = name
    this.isManually = true
    if(game.playerOne) {
      this.opponent = game.playerOne
      this.opponent.opponent = this
    } else if (game.playerTwo) {
      this.opponent = game.playerTwo
      this.opponent.opponent = this
    }
    socket.on('data', (buffer) => {
      const commandInfo = buffer.toString('utf-8').trim().toUpperCase().split(' ');
      const value = Number(commandInfo[1])
      this.handleCommand(game, commandInfo[0], value)
    })
    this.send(`Welcome ${this.name}`)
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
    if(!game.isFull()) return this.send('Cannot start the game, you should wait one more person')
    if(game.isStarted) {
      this.send('Game is already started')
      this.send(`Your opponent is: ${this.opponent.name}`)
    } else {
      game.startGame(this)
      this.send(`Game started by ${this.name}, input number is ${game.input}, Next turn: ${this.opponent.name}`)
      this.opponent.send(`Game started by ${this.name}, input number is ${game.input}, Next turn: you`)
      if(this.isManually && !this.opponent.isManually) {
        this.opponent.playGame(game, this.opponent.guessValue(game.input))
      }
    }
  }

  playGame(game, value) {
    game.updateTurn(this, value)
    if(game.isFinish()) {
      this.send(`You added ${value} the value now is ${game.roundValue}, you win. Game closed.`)  
      this.opponent.send(`${this.name} reached ${game.roundValue} first, so you lose. Game closed.`)
      game.closeGame()
    } else {
      this.send(`You added ${value}, the value now is ${game.roundValue}, Next turn: ${this.opponent.name}`)
      this.opponent.send(`${this.name} sent you the value ${game.roundValue}, choose one in [${GameLogic.options}] to send back`)
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