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
  ADD X: add number X to get a valid number
  AUTO: play automatically. You are not able to use command unless disconnection
  QUIT: quit the game
  STATUS: current Game information
  CMD: Check list commands
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