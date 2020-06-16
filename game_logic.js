const options = [-1,0,1]
const pivotNumber = 1
const MIN_RANDOM_NUMBER = 50
const MAX_RANDOM_NUMBER = 100

const initRandomNumber = () => {
  min = Math.ceil(MIN_RANDOM_NUMBER);
  max = Math.floor(MAX_RANDOM_NUMBER);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isDivisible = (divisor, dividend = 3) => {
  return (divisor % dividend) == 0
}

const division = (divisor, dividend = 3) => {
  return divisor / dividend
}

const instructionMsg = `
  == WELCOME TO GAME OF THREE. HOPE YOU HAVE GOOD TIME! ==.
  Here is something that you can do
  START: start the game
  QUIT: quit the game
  ADD X: add number X to get a valid number
  AUTO: player plays automatically. He then is not able to command unless disconnection
  STATUS: current Game information
  Other command considering as an Invalid Command
`

module.exports = {
  initRandomNumber,
  options,
  pivotNumber,
  isDivisible,
  division,
  instructionMsg
}