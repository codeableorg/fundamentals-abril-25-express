import express from "express";

// creamos nuestra aplicacion Express
const app = express();
const PORT = 3000;

// agregar la ruta "/" y el metodo GET a mi aplicacion
// devuelva una cadena diciendo Hola mundo

app.get("/", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.end("Hola Mundo");
});

// iniciar el servidor y empezar a escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo http://localhost:${PORT}`);
});
