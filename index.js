// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const leerBlob = require('./leerBlob');
require('./telemetria'); // activa la supervisión

app.use(cors());
app.use(express.static(__dirname)); // para servir tu bot.html

// Endpoint para responder preguntas del bot
app.get('/preguntar', async (req, res) => {
  const pregunta = req.query.pregunta?.toLowerCase();
  const data = await leerBlob();

  if (!pregunta) return res.json({ respuesta: "Por favor escribe una pregunta." });

  const fila = data.find(d => pregunta.includes(d.pregunta.toLowerCase()));
  if (fila) {
    res.json({ respuesta: fila.respuesta });
  } else {
    res.json({ respuesta: "No tengo información sobre eso. ¿Podrías reformular tu pregunta?" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
