var insertLocation = function(db, page, cb) {
    //make sure the database has the following setting:
    //db.locations.ensureIndex( { "loc.coordinates" : "2dsphere" } )
    db.collection("locations").insert(page, cb);
}

var getLocations = function(db, lng, lat, cb) {
    // db.command(
    //     {
    //         "geoNear": "locations.loc",
    //         "near" : {
    //             "$geometry": {"coordinates": [ Number(lng), Number(lat) ] },
    //             "$maxDistance": 5000
    //         },
    //         "spherical": true
    //     },
    //     function(err, results) {
    //         if (err) {
    //             console.log(err);
    //             return
    //         }
    //
    //         console.log(results);
    //     }
    // );
    db.collection("locations").find({
            "loc": {
                "$near" : {
                    "$geometry": { "type": "Point",  "coordinates": [ Number(lng), Number(lat) ] },
                    "$maxDistance": 5000
                }
            }
        }).toArray(function(err, results) {
            if (err) {
                cb(err);
            }

            if(results.length < 1) {
                //no businesses found
                cb(false, {"err": false, "inRadius": [], "otherNearby": []});
                return;
            }

            var inRadius = [];
            for(var i = 0; i < results.length; i++) {
                var lng2 = Number(results[i].loc.coordinates[0]);
                var lat2 = Number(results[i].loc.coordinates[1]);
                var radius = Number(results[i].rds);

                console.log(getDistanceInMeters(lng, lat, lng2, lat2));

                if(getDistanceInMeters(lng, lat, lng2, lat2) <= radius) {
                    inRadius.push(results.shift());
                }
            }

            cb(false, {"err": false, "inRadius": inRadius, "otherNearby": results});
        });
}

function getDistanceInMeters(lng, lat, lng2, lat2) {
    var R = 6371000; // km
    var dLat = (lat2-lat) * (Math.PI / 180.0);
    var dLng = (lng2-lng) * (Math.PI / 180.0);
    var lat = lat * (Math.PI / 180.0);
    var lat2 = lat2 * (Math.PI / 180.0);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

module.exports = {
    "insertLocation": insertLocation,
    "getLocations": getLocations
}
