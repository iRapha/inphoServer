var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// express config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

app.get("/", function(req, res) {
    console.log("working!");
});
