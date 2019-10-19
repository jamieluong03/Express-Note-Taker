// dependencies
var express = require("express");

// create express server
var app = express();

// set a port
var PORT = process.env.PORT || 8080;

// data parsing with express
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// routing files
require ("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// create a listener
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});