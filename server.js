import express from 'express'
import bodyParser from 'body-parser';
import upload from './config/storage';
import { extractText } from './lib/imageHandler';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload', upload.single('image'), async (req, res, next) => {
  const file = req.file
  // Retorna erro caso nenhum arquivo tenha sido enviado
  if (!file) {
    const error = new Error('Envie o arquivo a ser tratado');
    error.httpStatusCode = 400;
    return res.json(error)
  }

  // Inicia a extração de texto
  await extractText(file.path).then(text => {
    const result = { data: text, ...file };
    console.log('>>>>>',result);
    res.json(result);
  }).catch(error => {
    console.log('>>>>> algo deu errado!', error)
    res.json(error);
  });
})

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});