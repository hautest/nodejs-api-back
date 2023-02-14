const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

var mysql = require("mysql");

app.use(express.json());
app.use(cors());

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "opentutorials",
});

app.listen(process.env.PORT, function () {
  console.log("Server 실행");
});

app.get("/list", (req, res) => {
  connection.query("SELECT * from TodoList", (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.post("/create-list", (req, res) => {
  const value = req.body.value;
  connection.query(
    `INSERT INTO TodoList (checked, value) VALUES (false,'${value}') `,
    (error, rows) => {
      if (error) throw error;
      connection.query("SELECT * from TodoList", (error, rows) => {
        if (error) throw error;
        res.send(rows);
      });
    }
  );
});

app.patch("/update-list", (req, res) => {
  const id = req.body.id;
  connection.query(
    `UPDATE TodoList SET checked = !checked WHERE id = ${id}`,
    (error, rows) => {
      if (error) throw error;
      connection.query("SELECT * from TodoList", (error, rows) => {
        if (error) throw error;
        res.send(rows);
      });
    }
  );
});

app.delete("/list/:id", (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM TodoList WHERE id = ${id}`, (error, row) => {
    if (error) throw error;
    connection.query("SELECT * from TodoList", (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  });
});
