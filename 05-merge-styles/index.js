const fs = require ('fs');
const path = require ('path');
const road = path.join(__dirname, 'styles');

fs.readdir(road, {withFileTypes: true}, (error, data) =>{
  if (error) return console.error(error.message);
  let writing = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');
  data.forEach(element => {
    if (element.isFile()) {
      console.log(element);
      fs.stat(path.join(__dirname, 'styles', element.name), (err) => {
        if (err) return console.error(err.message);
        if (path.extname(element.name) === '.css') {
          let readding = fs.createReadStream(path.join(__dirname, 'styles', element.name), 'utf-8');
          readding.on('data', partData => writing.write(partData));
          readding.on('error', error => console.log('Ошибка: ', error.message));
        }
          
      });
    }
     
  });
   
});