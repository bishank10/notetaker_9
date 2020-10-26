// all the required modules

var express = require("express");
var fs = require("fs");
var path = require("path");
var dbFile = require("./db/db.json")
var app = express();
var PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let dbJson = require("./db/db.json");

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
    console.log("file sent");
})

// gets the index.html file
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
    console.log("file sent");
})

// gets the notes.html when the right path is hit

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
    console.log("file sent");
})

// responds with db.json file when path as mentioned is satisfied
app.get("/api/notes", function (req, res) {
    res.json(dbFile);
    console.log(dbFile);
})

//updates the db.json file by adding a new note

app.post("/api/notes", function (req, res) {

    const newNote = req.body;
    let uniqueId = 1;
    req.body.id = uniqueId;
    uniqueId++;
    dbFile.push(newNote);

    fs.writeFile("../db/db.json", JSON.stringify(dbFile), function (err) {
        if (err){
            res.status(400).send("invalid request")
        }
        res.json(newNote);
        res.send("new character created")
        res.end();
    })
})



// function is fired when the id is selected for deletion

app.delete("/api/notes/:id", function (req, res) {
    const idCharacterToBeDeleted = parseInt(req.params.id);

    // we want all characters not matching the one being updated
    const unTouchedCharacters = dbFile.filter(charObj => charObj.id !== idCharacterToBeDeleted);
    const itemToBeDeleted = dbFile.filter(charObj => charObj.id === idCharacterToBeDeleted)
    console.log(unTouchedCharacters);

    //updating the json file

    if (itemToBeDeleted === []) {
        res.status(404).send("the id you are looking for doe not exist");
    }
    fs.writeFile("../db/db.json", JSON.stringify(unTouchedCharacters), function (err) {
        res.send("character deleted")
        res.end();
    })

})




app.listen(PORT, function () {
    console.log("app is listening on" + PORT);
}) 