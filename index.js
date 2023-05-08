const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    name: "sabana",
    email: "sabana@gmail.com",
  },
  {
    id: 2,
    name: "khabana",
    email: "khabana@gmail.com",
  },
];
app.get("/", (req, res) => {
  res.send("The node is running");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  const newUser = req.body;
  const id = users.length + 1;
  newUser.id = id;
  users.push(newUser);
  res.send(newUser);
});
app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
