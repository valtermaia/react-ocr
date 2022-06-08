// Importa as bibliotecas
import * as tesseract from 'node-tesseract-ocr';
import fs from 'fs';
// Configura o Tesseract.js
const config = {
  lang: 'por', // Pacote de idioma (por == Português)
  oem: 1, // Rede neural Long short-term memory (LSTM)
  psm: 5 // Segmentação de letras
}
/** Legenda psm
* 0 = Orientação e detecção de scripts apenas (OSDI).
* 1 = Segmentação de página automática com OSD.
* 2 = Segmentação de página automática, sem OSD ou OCR.
* 3 = Segmentação de página automática, sem OSD. (Padrão)
* 4 = Assume uma coluna única de texto de tamanho variável.
* 5 = Assume um bloco único e justificado de texto verticalmente alinhado.
* 6 = Assume um bloco justificado de texto.
* 7 = Trata a imagem como uma única linha de texto.
* 8 = Trata a imagem como uma única palavra.
* 9 = Trata a imagem como uma única palavra num círculo.
* 10 = Trata a imagem como um caracter único.
*/
export async function extractText(filePath) {
  // Retorna uma promise com o resultado ou erro
  return new Promise((resolve, reject) => {
    // Inicia promise do Tesseract
    tesseract.recognize(filePath, config)
      .then(text => {
        // Limpa imagem temporária
        clearImage(filePath);
        // Retorna string do resultado
        resolve(text);
      })
      .catch(error => {
        // Limpa imagem temporária
        clearImage(filePath);
        // Retorna erro
        reject(error);
      })
  });
}
// Limpa imagem temporária na pasta /images
function clearImage(filePath) {
  //console.log('>>>> apagando a imagem temporária...');
  fs.unlinkSync(filePath);
}