import express from "express";

// crear el servidor web
const app = express();

// agregamos middlewares
app.use(express.json());

let users = [
  {
    id: 1,
    name: "Tom",
  },
  {
    id: 2,
    name: "Jerry",
  },
];

app.get("/", (req, res) => {
  res.end("Hola mundo");
});

/*
app.post("/users", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); //",name:Ringo"
    // body === "" + "{id:3"
    // body === "{id:3" + "name: Ringo"
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
  });
  res.end("se ha creado un nuevo usuario");
});
*/
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.end("se ha creado un nuevo usuario");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = users.find((user) => String(user.id) === userId);
  res.json(user);
});

app.delete("/user/:id", (req, res) => {
  const userId = req.params.userId;
  const index = users.findIndex((user) => user.id === userId);
  // const newUsers = users.filter(user => String(user.id) !== userId)
  users.splice(index, 1);
  res.end(`se elimino el usuario con id ${req.params.id}`);
});

app.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});
