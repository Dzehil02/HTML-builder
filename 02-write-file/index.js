const fs = require('fs');
const path = require('path');
const readline = require('readline');
const writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

output.write('Введите текст:  \n');
rl.on('line', (input) => {
  writeableStream;
  if(input !== 'exit'){
    fs.appendFile(path.join(__dirname, 'text.txt'),`${input}\n`, err =>{
      if (err) throw err;
      console.log('Файл изменён');
    } );
  }
  if (input === 'exit'){
    console.log('До свидания!');
    rl.close();
  }
        
});
rl.on('SIGINT', () => {
  console.log('До свидания!');
  rl.close();
});