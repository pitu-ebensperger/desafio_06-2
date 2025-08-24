const express = require('express') // importo express
const app = express() // ejecuto express para ob
const fs = require ('fs') // importo filesystem
const cors = require('cors') // importo cors
const path = require('path'); // importo path

const PORT = 3000 // defino puerto 
app.listen(PORT, function(err){ // levanto servidor
    if (err) { console.error("Error levantando el servidor"); return; }
    console.log("Servidor encendido en el puerto", PORT)
})

app.use(cors()) 
app.use(express.json()) // uso express.json para recibir datos en formato JSON

function readCanciones() {
    try {
    return JSON.parse(fs.readFileSync('./repertorio.json', 'utf8'));
  } catch {
    return [];
  }
}


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});


// GET/canciones
app.get("/canciones", (req, res) => {
const canciones = readCanciones();
  res.json(canciones);
});


// POST/canciones 
app.post("/canciones", (req, res) => {
const cancion = req.body
const canciones = readCanciones()
canciones.push(cancion) //agrego cancion al array
fs.writeFileSync('./repertorio.json', JSON.stringify(canciones)) //escribo el archivo
res.status(201).send ('Canción agregada con éxito') //envío respuesta al cliente
});




// PUT/canciones/:id
app.put("/canciones/:id", (req, res) => {
const {id} = req.params
const cancion = req.body || {}; //si req.body undefined o null, asigno objeto vacío
const canciones = readCanciones()
const index = canciones.findIndex(p => p.id == id)
if (index === -1) {
  return res.status(404).send('Canción no encontrada'); //si no existe, envío error 400
}
canciones[index] = { ...canciones[index], ...cancion, id: canciones[index].id }; //uso operador spread juntando array y objeto nuevo, mantengo id original
fs.writeFileSync('./repertorio.json', JSON.stringify(canciones)) //escribo el archivo
res.status(200).send ('Canción actualizada con éxito') //envío respuesta al cliente
});

//DELETE/canciones/:id
app.delete("/canciones/:id", (req, res) => {
const {id} = req.params
const canciones = readCanciones()
const index = canciones.findIndex(p => p.id == id)
if (index === -1) {
    return res.status(404).send('Canción no encontrada'); //si no existe, envío error 400
  }
canciones.splice(index, 1) 
fs.writeFileSync('./repertorio.json', JSON.stringify(canciones)) //escribo el archivo
res.send ('Canción eliminada con éxito') //envío respuesta al cliente
});
