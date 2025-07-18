import express from "express";

// creamos nuestra aplicacion Express
const app = express();
const PORT = 3000;

// agregamos middleware para enviar archivos estaticos
// app.use('/static', express.static('public'))

// configuramos el motor de plantillas ejs
app.set("view engine", "ejs");
// app.set('views', './views')

// agregar la ruta "/" y el metodo GET a mi aplicacion
// devuelva una cadena diciendo Hola mundo

app.get("/", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.end("Hola Mundo");
});

// ruta donde vamos a usar las plantillas
app.get("/hello", (req, res) => {
  const user = { name: "Tom" };
  res.render("hello", user);
});

// iniciar el servidor y empezar a escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo http://localhost:${PORT}`);
});
