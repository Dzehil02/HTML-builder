const fs = require ('fs');
const path = require ('path');

const road = path.join(__dirname, 'files');
const road_copy = path.join(__dirname, 'files-copy');
console.log(road, '\n', road_copy);

function copyDir () {

  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive : true}, err => {
    if (err) throw err;
    console.log('Папка "files-copy" создана');
  });


  fs.readdir(road_copy, (error, data) =>{
    if (error) return console.error(error.message);
    data.forEach(element => {
      fs.unlink(path.join(__dirname, 'files-copy', element), err => {
        if (err) return console.error(err.message);
      });
    });
  });

  fs.readdir(road, (error, data) =>{

    if (error) return console.error(error.message);
    data.forEach(element => {
      fs.copyFile(path.join(__dirname,'files', element), path.join(__dirname,'files-copy', element), 
        err => {
          if (err) return console.error(err.message);
        });
      
    });
  }); 
}
copyDir();