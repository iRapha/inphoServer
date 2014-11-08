var insertLocation = function(db, page, cb) {
    //make sure the database has the following setting:
    //db.locations.ensureIndex( { loc : "2dsphere" } )
    db.collection("locations").insert(page, cb);
}

module.exports = {
    "insertLocation": insertLocation
}
