// leerBlob.js
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

async function leerBlob() {
  const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const container = blobService.getContainerClient(process.env.AZURE_STORAGE_CONTAINER);
  const blob = container.getBlobClient('preguntas_horario.csv');
  const buffer = await blob.downloadToBuffer();
  const texto = buffer.toString('utf-8');

  // convertir CSV en arreglo de objetos
  const lineas = texto.trim().split('\n');
  const cabeceras = lineas.shift().split(',');
  return lineas.map(l => {
    const cols = l.split(',');
    return {
      pregunta: cols[0].replace(/"/g, ''),
      respuesta: cols[1].replace(/"/g, '')
    };
  });
}

module.exports = leerBlob;
