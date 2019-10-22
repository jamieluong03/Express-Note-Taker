var journalData = require("../db/journalData");

module.exports = function(app) {

    // getting data to display in html
    app.get("/api/notes", function (req, res){
        res.json(journalData);
    });

    // adding new data into html
    app.post("/api/notes", function (req, res){
        journalData.push(req.body);
        res.json(true);
    });

    // delete data into html
    app.delete("/api/notes/:deleteNote", function (req, res) {
        let eraseMe = req.params.deleteNote;
        console.log(eraseMe);
        journalData = journalData.filter( x => x.title !== eraseMe);
    });



}