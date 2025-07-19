const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

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

app.listen(3000, () => {
  console.log("escuchando en http://localhost:3000");
});
