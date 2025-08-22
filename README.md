# Desafío 2 - Repetorio
Curso Backend con Node y Express (G90) - 2 Introducción a Express Js


### Descripción
Desarrollar un servidor con Express que use el módulo File System para agregar/modificar/eliminar canciones almacenadas en un JSON local (**repertorio.json**), con las siguientes rutas:
- **POST /canciones** > Recibe datos canción y agrega a repertorio.
- **GET /canciones** > Devuelve JSON con canciones registradas en repertorio.
- **PUT /canciones/:id** > Recibe datos canción a editar y los actualiza manipulando JSON local.
- **DELETE /canciones/:id** > Recibe x queryString un id y elimina la canción del repertorio.

### Requerimientos
1. Levantar servidor local usando Express Js.
2. Devolver una página web como respuesta a consulta GET.
3. Ofrecer diferentes rutas con diferentes métodos HTTP que permitan operaciones CRUD de datos en archivo JSON local.
4. Manipular parámetros obtenidos en URL.
5. Manipular payload de consulta HTTP al servidor.


> **OPCIONAL** Crear servidor de Veterinaria Js con 2 rutas para registrar y leer las citas.



## Notas
### Setup Express ###
1. Inicio Node JS y genero package.json: `npm init -y`
2. Instalo dependecias: `npm install express`
3. Creo archivo index.js con este código:
    ```
        const express = require('express')
        const app = express()
        app.listen(3000, console.log("¡Servidor encendido!"))
        app.get("/home", (req, res) => {
        res.send("Hello World Express Js")
        })
    ```
4. Levanto servidor con `node index.js` y lo puedo ver en http://localhost:3000/home

5. Instalo nodemon npm i -D nodemon 
6. Agrego en package.json: 
    ```
    "scripts": {
        "dev": "nodemon index.js",
        "start": "nodemon index.js",...}
    ```
7. Levanto servidor con `npm run dev`