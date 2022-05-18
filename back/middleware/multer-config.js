//multer pour la gestion des images et à appliquer aux routes.
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, 'images') //enregistrer les fichiers dans le dossier images qu'on a céer
    },
    filename: (req, file, callback) => {
        //générer le nv nom du fichier
        const name = file.originalname.split('.')[0].split(' ').join('_'); 
        //mime type
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');  