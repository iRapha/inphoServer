var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var stylus = require('stylus');
var locations = require(__dirname + "/db/locations.js");

// express config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({src: __dirname + '/public/styles/'}));
app.use(express.static(__dirname + '/public'));

MongoClient.connect((process.env.MONGOLAB_URI
        || "mongodb://localhost:27017/inpho"), function(err, db) {
    if (err) {
        throw err;
    }

    // landing page with inpho info
    app.get("/", function(req, res) {
        res.render("index", 200);
    });

    // get page, given a location longitude and latitude
    app.get("/page", function(req, res) {
        res.status(200).send("http://reddit.com");
    });

    // display the registration webpage (requesting page location and info)
    app.get("/registerpage", function(req, res) {
        res.render("selectlocation", 200);
    });

    // register the page
    app.post("/registerpage", function(req, res) {
        var lat = req.body.lat;
        var lng = req.body.lng;
        var rds = req.body.rds;
        if(!lat || !lng || !rds) {
            res.redirect("/registerpage");
            return;
        }

        var pageName = req.body.pageName;
        var fontColor = req.body.fontColor;
        var pageColor = req.body.pageColor;
        var pageHTML = req.body.pageHTML;
        if(!pageName || !pageColor || !fontColor || !pageHTML) {
            res.render("pageinformation", {"lat": lat, "lng": lng, "rds": rds});
            return;
        }

        var coords = [Number(lng), Number(lat)]
        console.log(coords);
        var page = {
            "name": pageName,
            "loc": {
                "type": "Point",
                "coordinates": coords
            },
            "rds": rds,
            "pageContent": {
                "html": pageHTML,
                "pageColor": pageColor,
                "fontColor": fontColor
            }
        }

        locations.insertLocation(db, page, function(err, inserted) {
            if (err) {
                res.render("error", {"err": err})
                return;
            }

            res.render("success", inserted);
        });
    });

});
