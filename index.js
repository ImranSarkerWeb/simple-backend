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

//WWX4jay8ZmzjIj9v
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://imransarkerweb:WWX4jay8ZmzjIj9v@cluster0.kvip9bz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.post("/users", async (req, res) => {
      console.log(req.body);
      const newUser = req.body;
      const id = users.length + 1;
      newUser.id = id;
      users.push(newUser);

      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
