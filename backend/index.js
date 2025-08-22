const express = require('express') // importo express
const app = express() // ejecuto express para ob
const fs = require ('fs') // importo filesystem
const cors = require('cors') // importo cors

app.listen(3000, console.log("¡Servidor encendido!")) // levanto servidor y identifico puerto

app.use(cors()) 
app.use(express.json()) // uso express.json para recibir datos en formato JSON

function readCanciones(req, res) {
    try {
    return JSON.parse(fs.readFileSync('./repertorio.json', 'utf8'));
  } catch {
    return [];
  }
}

// GET/canciones
app.get("/canciones", (req, res) => {
const canciones = readCanciones();
  res.json(canciones);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// POST/canciones 
app.post("/canciones", (req, res) => {
const cancion = req.body
const canciones = readCanciones()
canciones.push(cancion) //agrego cancion al array
fs.writeFileSync('./repertorio.json', JSON.stringify(canciones)) //escribo el archivo
res.send ('Canción agregada con éxito') //envío respuesta al cliente
});

// PUT/canciones/:id
app.put("/canciones/:id", (req, res) => {
const {id} = req.params
const cancion = req.body
const canciones = readCanciones()
const index = canciones.findIndex(p => p.id == id)
if (index === -1) {
    return res.status(404).send('Canción no encontrada')
}
canciones[index] = cancion;
fs.writeFileSync('./repertorio.json', JSON.stringify(canciones)) //escribo el archivo
res.send ('Canción actualizada con éxitnode index.jso') //envío respuesta al cliente
});

//DELETE/canciones/:id
app.delete("/canciones/:id", (req, res) => {
const {id} = req.params
const canciones = readCanciones()
const index = canciones.findIndex(p => p.id == id)
if (index === -1) {
    return res.status(404).send('Canción no encontrada');
  }
canciones.splice(index, 1) 
fs.writeFileSync('./repertorio.json', JSON.stringify(canciones)) //escribo el archivo
res.send ('Canción eliminada con éxito') //envío respuesta al cliente
});
