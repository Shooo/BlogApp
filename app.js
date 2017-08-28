var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var routes = require("./routes/routes.js");

// APP CONFIG
mongoose.connect("mongodb://localhost/blogapp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", routes);

app.listen(3000, function(){
	console.log("running...");
})