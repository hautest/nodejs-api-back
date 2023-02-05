const express = require("express");
const cors = require("cors");

const app = express();

app.listen(8080, function () {
  console.log("server listening on port 3000");
});

app.use(express.json());
app.use(cors());

app.get("/hello-world", function (req, res) {
  res.send("hello world");
});
