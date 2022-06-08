import path from 'path'
const multer = require('multer');

// Cria instância do multer
const storage = multer.diskStorage({
  // Configura o destino dos arquivo recebidos => /images
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  // Após o upload renomeia os arquivos
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now())
  }
});
// Exporta a instância configurada
export default multer({
  storage: storage, fileFilter: function (_req, file, callback) {
    const ext = path.extname(file.originalname);
    // Permite apenas upload de arquivos de imagem
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Apenas imagens são permitidas'))
    }
    callback(null, true)
  },
  // Limita o tamanho das imagens
  limits: {
    fileSize: 1024 * 1024
  }
});