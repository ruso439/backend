import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();

// Configura multer para la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const uploader = multer({ storage: storage });

// Middleware para la subida de archivos
const uploadMiddleware = uploader.single('myFile');

// Exporta el uploader y el middleware
export { __dirname, uploader, uploadMiddleware };