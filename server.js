"use strict";

var express = require("express");
var cors = require("cors");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

// require and use "multer"...

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function (req, res) {
  res.json({ greetings: "Hello, API" });
});
app.post("/api/fileanalyse/", upload.single("upfile"), (req, res) => {
  try {
    var { filename: name, mimetype: type, size } = req.file;
    res.json({ name, type, size });
  } catch (err) {
    console.log(err);
    res.statusCode(400);
  }
});
app.listen(3000, () => {
  console.log("Node.js listening ...");
});
