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


module.exports = {
  initRandomNumber,
  options,
  pivotNumber,
  isDivisible,
  division
}