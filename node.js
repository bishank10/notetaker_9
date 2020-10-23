var express = require("express");
var fs = require("fs");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let dbJson = require("./db/db.json");




app.listen(PORT, function () {
    console.log("app is listening on");
}) 