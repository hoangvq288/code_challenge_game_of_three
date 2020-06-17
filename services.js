const addInfo = (msg) => {
  console.log(`[INFO] ${msg}`)
}

const addWarning = (msg) => {
  console.log(`[WARNING!] ${msg}`)
}

const handleCommand = (buffer) => {
  const input = buffer.toString('utf-8').trim().toUpperCase().split(' ');
  return {
    command: input[0],
    value: Number(input[1])
  }
}

const delayTime = (second) => {
  return new Promise(done => setTimeout(() => done(), second * 1000)); 
}

module.exports = {
  addInfo,
  addWarning,
  handleCommand,
  delayTime
}