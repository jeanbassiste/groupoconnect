//Middleware pour uploader une image avec multer
const multer = require('multer');

console.log('on entre dans multer 2')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};


//Paramètre le dossier d'enregistrerment de l'image
const storage = multer.diskStorage({
  destination: (req, file, callback) => {

    callback(null, 'back/images');
  },
  //Paramètre le nom du fichier
  filename: (req, file, callback) => {
    console.log(file);
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');
