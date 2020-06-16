const net = require('net');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

const client = new net.Socket();
const port = 9000
let isManual = true

client.connect(port, process.argv[2], () => {
  console.log('Connected to server');
});

// receive data from server
client.on('data', (buffer) => {
  const data = buffer.toString('utf-8').trim()
  if(data == 'fs') {
    console.log('Sorry there is not enough space!');
    return rl.close()
  } else if(data == 'quit') {
    console.log('Bye! See you')
    return rl.close()
  } else if(data == 'auto') {
    console.log('Auto playing game')
    isManual = false
  } else {
    console.log(data.toString('utf-8'));
  }
});


rl.on('line', (line) => {
  if(!isManual) {
    console.log('Cannot command while in Automation mode. Please quit and reconnect the server')
  } else if(line) {
    client.write(`${line}\n`);
  }
});
rl.on('close', () => {
  client.end();
});