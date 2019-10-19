// dependencies
var path = require("path");

module.exports = function(app) {

    // get requests into html
    app.get("/notes", function (req, res){
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    });

    // if no matching routes found, default to home page
    app.get("*", function (req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });
}