//Middleware pour uploader une image avec multer
const multer = require('multer');

//Prépare les différents formats de fichier
/*
const imageFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback('Merci de joindre une image', false)
    }
};

var storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, __basedir + '../images');
    },
    filename: (req, res, callback) => {
        callback(null, `${Date.now()}-bezskoer-${file.originalname}`);
    }
});
var uploadFile = multer({ storage: storage, fileFilter: imageFilter});
module.exports = uploadFile;
*/


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


//Paramètre le dossier d'enregistrerment de l'image
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //Paramètre le nom du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');
