// all the required modules

var express = require("express");
var fs = require("fs");
var dbFile = require("./db/db.json")
var app = express();
var PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let dbJson = require("./db/db.json");

// gets the note.html file
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '', "./public/index.html"))
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '', "./public/notes.html"))
})


app.get("/api/notes", function (req, res) {
    res.json(dbFile);
    console.log();
})

app.post("/api/notes", function (req, res) {

    const newNote = req.body;
    let uniqueId = 1;
    req.body.id = uniqueId;
    uniqueId++;
    res.json(newNote);
    dbFile.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(dbFile), function (err) {
        res.send("new character created")
        res.end(); // this has to be inside a function to avoid error just dummy code for this to work you will have to require fs
    })
})

// function is fired when the id is selected for deletion

app.delete("/api/notes/:id", function (req, res) {
    const idCharacterToBeDeleted = req.params.id;
  
    // we want all characters not matching the one being updated
    const unTouchedCharacters = characters.filter(charObj => charObj.id !== idCharacterToBeDeleted)
    console.log(unTouchedCharacters);
  
    //updating the json file
    fs.writeFile("./characters.json", JSON.stringify(unTouchedCharacters), function(err){
      res.send("new character updated")
      res.end(); // this has to be inside a function to avoid error just dummy code for this to work you will have to require fs
    })

})




app.listen(PORT, function () {
    console.log("app is listening on" + PORT);
}) 