'use strict';
const mongodb = require('mongodb');
const config = require('../config/config');

const server = new mongodb.Server(config.mongodb.host, config.mongodb.port, {
    auto_reconnect: true,
    socketOptions: {keepAlive: 1}
});

const db = new mongodb.Db(config.mongodb.database, server);

db.open((err, db) =>
{
    if (err) throw err;

    // DEBUG
    console.log("Connected to database");

    db.authenticate(config.mongodb.user, config.mongodb.password, (err, res) =>
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

function initData()
{
    const testData = require('../config/db_test_data');

    db.collection(config.mongodb.collection).drop(() =>
    {
        db.collection(config.mongodb.collection).insertMany(testData, (err, result) =>
        {
            if (err) throw err;

            // DEBUG
            console.log(result);
        });
    });
};

module.exports = db;


