const GameLogic = require('../game_logic')
const Player = require('./player')
class Game {
  constructor() {
    this.name = 'Game of Three'
    this.isStarted = false
  }

  addPlayerOne(socket, name) {
    this.playerOne = new Player(this, socket, name)
    this.informPlayer(this.playerOne, this.getGameInstruction())
    this.informPlayer(this.playerTwo, `${name} is connected.`)
  }

  addPlayerTwo(socket, name) {
    this.playerTwo = new Player(this, socket, name)
    this.informPlayer(this.playerTwo, this.getGameInstruction())
    this.informPlayer(this.playerOne, `${name} is connected.`)
  }

  informPlayer(player, message ) {
    if(player) {
      player.send(message)
    }
  }

  onDisconnect(player) {
    if(player === this.playerOne) {
      this.playerOne = null
    } else {
      this.playerTwo = null
    }
    this.isStarted = false
  }

  startGame(player) {
    this.isStarted = true
    this.input = GameLogic.initRandomNumber()
    this.roundValue = this.input
    this.nextTurn = player.opponent
    
    this.informPlayer(player, `Game started by ${player.name}, input number is ${this.input}, Next turn: ${player.opponent.name}`)
    this.informPlayer(player.opponent, `Game started by ${player.name}, input number is ${this.input}, Next turn: you`)
  }
  
  
  startAutoMode(player, playerOpponent) {
    this.startGame(player)
    let i = 0
    while(i < 10) {
      if(this.roundValue !== GameLogic.pivotNumber) {
        if(this.nextTurn == player) {
          player.playGame(this, player.guessValue(this.roundValue))
        } else {
          playerOpponent.playGame(this, playerOpponent.guessValue(this.roundValue))
        }
      } else {
        i +=1
        this.roundValue = GameLogic.initRandomNumber()
      }
    }
  }

  closeGame(winPlayer, value) {
    this.isStarted = false
    this.informPlayer(winPlayer, `You added ${value} the value now is ${this.roundValue}, you win. START to restart.`)
    this.informPlayer(winPlayer.opponent, `${winPlayer.name} reached ${this.roundValue} first, so you lose. START to restart.`)
  }

  informState(currentPlayer, value) {
    this.informPlayer(currentPlayer, `You added ${value}, the value now is ${this.roundValue}, Next turn: ${currentPlayer.opponent.name}`)
    this.informPlayer(currentPlayer.opponent, `${currentPlayer.name} sent you the value ${this.roundValue}, choose one in [${GameLogic.options}] to send back`)
  }

  isFull() {
    return this.playerOne && this.playerTwo
  }

  isEmpty() {
    return !this.playerOne && !this.playerTwo
  }
  isValidNumber(value) {
    return GameLogic.options.includes(value) && GameLogic.isDivisible(this.roundValue + value)
  }

  adjustInput(value) {
    this.roundValue = GameLogic.division(this.roundValue + value)
    return this.roundValue
  }

  updateTurn(player, value) {
    this.adjustInput(value)
    this.nextTurn = player.opponent
  }

  invalidTurn(player) {
    return this.nextTurn !== player 
  }

  isFinish() {
    return this.roundValue == GameLogic.pivotNumber
  }

  getRoundValue() {
    return this.roundValue
  }

  getStatus() {
    return `Initiate Value: ${this.input}. Current value: ${this.roundValue}. Next Turn: ${this.nextTurn.name}`
  }

  getGameInstruction() {
    return GameLogic.instructionMsg
  }
}

module.exports = Game