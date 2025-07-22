const express = require("express");
const fs = require("fs");
const path = require("path");
const getNextId = require("../utils/utils.js");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "notes.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const notes = JSON.parse(data);
    res.render("notes", { notes });
  });
});

app.get("/notes/:id", (req, res) => {
  const filePath = path.join(__dirname, "notes.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const notes = JSON.parse(data);
    const id = req.params.id;
    const index = notes.findIndex((note) => String(note.id) === id);
    notes.splice(index, 1);

    fs.writeFile(filePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      res.redirect("/");
    });
  });
});

// ruta para crear notas
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const filePath = path.join(__dirname, "notes.json");
  // leer el contenido de notes.json
  fs.readFile(filePath, "utf-8", (err, data) => {
  
    if (err) {
      console.error(err);
      return;
    }

    const notes = JSON.parse(data)

    // crear una nueva nota, generando un nuevo id
    const id = getNextId();
    const newNote = { id, title, content };

    // actualizamos las notas
    notes.push(newNote)

    // escribimos las notas actualizadas en el archivo
    fs.writeFile(filePath, JSON.stringify(notes), (error) => {
      if (error) {
        console.error(error)
        return
      }

      res.redirect("/");
    })
  })
});

app.listen(3000, () => {
  console.log("escuchando en http://localhost:3000");
});
