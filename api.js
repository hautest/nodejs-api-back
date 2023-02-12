const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

app.listen(8080, function () {
  console.log("server listening on port 3000");
});

app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://lee:parangse29@todolist.myluw50.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client
  .connect((err) => {
    const collection = client.db("test").collection("devices");
    client.close();
  })
  .then(() => {
    console.log("mongoDB 연결 !");
  });
