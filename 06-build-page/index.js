const fs = require ('fs');
const path = require ('path');
const roadStyles = path.join(__dirname, 'styles');
const roadComponents = path.join(__dirname, 'components');
const roadProjectDist = path.join(__dirname, 'project-dist');
const roadIndex = path.join(roadProjectDist, 'index.html');
const roadAssets = path.join(__dirname, 'assets');

let template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

fs.mkdir(roadProjectDist, {recursive : true}, err => {
  if (err) throw err;
  console.log('Папка "project-dist" создана');
});


// --------------------------------Make Index-----------------------
function makeIndex () {
  template.on('data', (chunk) => {
    let halfFile = chunk;
    fs.readdir(roadComponents, {withFileTypes: true}, (err, data) => {
      data.forEach(element => {
        if(element.isFile()) {
          if (path.extname(element.name) === '.html') {
            const readding = fs.createReadStream(path.join(roadComponents, element.name), 'utf-8');
            readding.on('error', error => console.log('Ошибка: ', error.message));
            readding.on('data', (chunk) => {
              const nameTags = '{{'+path.basename(element.name).slice(0, -5)+'}}';
              const note = chunk;
              const regExp = new RegExp(nameTags, 'g');
              halfFile = halfFile.replace(regExp, note);
              fs.writeFile(roadIndex, halfFile, () => {});
            });
          }
        }
      });
    });
  });
}
makeIndex();

// --------------------------------------Make Style---------------------------
function makeStyle () {
  fs.readdir(roadStyles, {withFileTypes: true}, (error, data) =>{
    if (error) return console.error(error.message);
    let writing = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8');
    data.forEach(element => {
      if (element.isFile()) {
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
}
makeStyle();

// --------------------------------------Copy assets---------------------------
function copyAssets (directory) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      const files = path.join(directory, file.name);
      const filesCopy = path.join(roadProjectDist, files.slice(__dirname.length, files.length));

      if (file.isFile()) {
        fs.copyFile(files, filesCopy, error => { 
          if (error) return console.error(error.message);
        });
      } else {
        fs.mkdir(filesCopy, { recursive: true }, (error) => {
          if (error) return console.error(error.message);
          copyAssets(files);
        });
      }
    });
  });
}
copyAssets(roadAssets);