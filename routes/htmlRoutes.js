var path = require("path");

module.exports = function(app) {

    // get requests into html
    app.get("/notes", function (req, res){
        res.sendFile(path.join(_dirname, "..public/notes.html"))
    })
}