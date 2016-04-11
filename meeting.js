var express = require("express");
var app = express();

var mongoose=require("mongoose");
mongoose.connect("mongodb://root:admin@ds037597.mlab.com:37597/mongodb_test_20160322");






app.get("/", function (req, res) {
    res.send("hello world");
});





var server = app.listen(3000, function () {
    console.log(JSON.stringify(server.address()))
})

