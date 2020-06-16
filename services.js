const addInfo = (msg) => {
  console.log(`[INFO] ${msg}`)
}

const addWarning = (msg) => {
  console.log(`[WARNING!] ${msg}`)
}

module.exports = {
  addInfo,
  addWarning
}