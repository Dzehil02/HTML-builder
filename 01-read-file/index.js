const fs = require('fs');
const path = require('path');

const road = path.join(__dirname,  'text.txt');
// const ReadStream = fs.createReadStream(road);
const ReadStream = new fs.ReadStream(road, 'utf-8');
let data = '';

ReadStream.on('data', chunk => data += chunk);
ReadStream.on('end', () => console.log( data));
ReadStream.on('error', error => console.log('Ошибка', error.message));