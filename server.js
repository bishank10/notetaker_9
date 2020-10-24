var express = require("express");
var fs = require("fs");
var dbFile = require("./db/db.json")
var app = express();
var PORT  = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let dbJson = require("./db/db.json");

// gets the note.html file
app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname,'',"./public/index.html"))
})

app.get("*", function(req,res){
    res.sendFile(path.join(__dirname,'',"./public/notes.html"))
})


app.get("/api/notes", function(req,res){
    res.json(dbFile);
    console.log(note);
})

app.post("/api/notes", function(req,res){

    const newNote = req.body;
    res.json(newCharacter);
    dbFile.push(newNote);
    
    fs.writeFile("./db/db.json", JSON.stringify(dbFile), function(err){
      res.send("new character created")
      res.end(); // this has to be inside a function to avoid error just dummy code for this to work you will have to require fs
    })
    })

// function is fired when the id is selected for deletion

app.delete("/api/notes/:id", function(req,res){

})




app.listen(PORT, function () {
    console.log("app is listening on"+ PORT );
}) 