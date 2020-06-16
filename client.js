const net = require('net');
const Services = require('./services')
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

const client = new net.Socket();
const port = 9000
let isManual = true

client.connect(port, process.argv[2], () => {
  Services.addInfo('Connected to server');
});

// receive data from server
client.on('data', (buffer) => {
  const data = buffer.toString('utf-8').trim()
  if(data == 'fs') {
    Services.addWarning('Sorry there is not enough space!');
    return rl.close()
  } else if(data == 'quit') {
    Services.addInfo('Bye! See you')
    return rl.close()
  } else if(data == 'auto') {
    Services.addInfo('Play game automatically')
    isManual = false
  } else {
    Services.addInfo(data.toString('utf-8'));
  }
});


rl.on('line', (line) => {
  if(!isManual) {
    Services.addWarning('Cannot command in Auto Mode.')
  } else if(line) {
    client.write(`${line}\n`);
  }
});

rl.on('close', () => {
  client.end();
});