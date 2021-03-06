const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { exec } = require("child_process");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

var state = {};

app.post("/state", (req, res) => {
  state = req.body.state;
  res.send(state);
});
app.get("/state", (req, res) => {
  res.send(state);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/animation", (req, res) => {
  res.render("animation");
});

app.get("/shutdown", (req, res) => {
  exec("shutdown -h now", (err, stdout, stderr) => {
    res.send(`err: ${err}<br>stdout: ${stdout}<br>stderr: ${stderr}`);
  });
});

app.listen(80, () => {
  console.log("Going!");
});
