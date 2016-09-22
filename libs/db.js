var mongodb = require('mongodb');
var config = require('../config/config');

var server = new mongodb.Server(config.mongodb.host, config.mongodb.port, {
    auto_reconnect: true,
    socketOptions: {keepAlive: 1}
});

var db = new mongodb.Db(config.mongodb.database, server);

db.open(function (err, db)
{
    if (err) throw err;

    // DEBUG
    console.log("Connected to database");

    db.authenticate(config.mongodb.user, config.mongodb.password, function (err, res)
    {
        if (err) throw err;

        // DEBUG
        console.log("Authenticated to database");

        if (process.env.NODE_ENV === 'development')
        {
            initData();
        }
    });
});

var initData = function ()
{
    var testData = require('../config/db_test_data');

    db.collection(config.mongodb.collection).drop(function ()
    {
        db.collection(config.mongodb.collection).insertMany(testData, function (err, result)
        {
            if (err) throw err;

            // DEBUG
            console.log(result);
        });
    });
};

module.exports = db;


