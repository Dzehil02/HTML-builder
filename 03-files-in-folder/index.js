const fs = require('fs');
const path = require('path');
const road = path.join(__dirname, 'secret-folder');

fs.readdir(road, {withFileTypes: true},  (error, data) => {
  if (error) return console.error(error.message);
  data.forEach(note => {
    if (note.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', note.name), (err, stats) => {
        console.log(path.basename(note.name, path.extname(note.name)) + '\t\t'  + path.extname(note.name) + '\t\t' + stats.size + ' Bytes');
      });
    }
  });
});