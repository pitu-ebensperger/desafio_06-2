const express = require('express') // importo express
const app = express() // ejecuto express para ob
const fs = require ('fs') // importo filesystem
const cors = require('cors') // importo cors

app.listen(3000, console.log("¡Servidor encendido!")) // levanto servidor y identifico puerto

app.use(cors()) 
app.use(express.json()) // uso express.json para recibir datos en formato JSON

function getCanciones(req, res) {
    try {
    return JSON.parse(fs.readFileSync('./canciones.json', 'utf8'));
  } catch {
    return [];
  }
}

// GET/canciones
app.get("/canciones", (req, res) => {
const canciones = getCanciones();
  res.json(canciones);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get("/home", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// POST/canciones
app.post("/canciones", (req, res) => {
const cancion = req.body
const canciones = getCanciones()
canciones.push(cancion) //agrego cancion al array
fs.writeFileSync('./canciones.json', JSON.stringify(canciones)) //escribo el archivo
res.send ('Canción agregada con éxito') //envío respuesta al cliente
});

// PUT/canciones/:id
app.put("/canciones/:id", (req, res) => {
const {id} = req.params
const cancion = req.body
const canciones = getCanciones()
const index = canciones.findIndex(p => p.id == id)
if (index === -1) {
    return res.status(404).send('Canción no encontrada')
}
canciones[index] = cancion;
fs.writeFileSync('./canciones.json', JSON.stringify(canciones)) //escribo el archivo
res.send ('Canción actualizada con éxito') //envío respuesta al cliente
});

//DELETE/canciones/:id
app.delete("/canciones/:id", (req, res) => {
const {id} = req.params
const canciones = getCanciones()
const index = canciones.findIndex(p => p.id == id)
if (index === -1) {
    return res.status(404).send('Canción no encontrada');
  }
canciones.splice(index, 1) 
fs.writeFileSync('./canciones.json', JSON.stringify(canciones)) //escribo el archivo
res.send ('Canción eliminada con éxito') //envío respuesta al cliente
});
