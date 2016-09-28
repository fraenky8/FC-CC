'use strict';
const mongodb = require('mongodb');
const config = require('../config/config');

const server = new mongodb.Server(config.mongodb.host, config.mongodb.port, {
    auto_reconnect: true,
    socketOptions: {keepAlive: 1}
});

/**
 * @typedef {mongodb.Db} db
 */
const db = new mongodb.Db(config.mongodb.database, server);

db.open()
.then(db =>
{
    // DEBUG
    console.log('Connected to database');

    return db.authenticate(config.mongodb.user, config.mongodb.password);
})
.then(b => // true
{
    // DEBUG
    console.log('Authenticated to database', b);

    if (process.env.NODE_ENV === 'development') initData();
})
.catch(err =>
{
    // DEBUG
    console.log('ERROR', err);
})
;

function initData()
{
    const testData = require('../config/db_test_data');

    db
    .collection(config.mongodb.collection)
    .drop()
    .then(b => // true
    {
        return db.collection(config.mongodb.collection).insertMany(testData);
    })
    .then(result => // finalResult-object
    {
        // DEBUG
        console.log(result);
    })
    .catch(err =>
    {
        // DEBUG
        console.log('ERROR', err);
    });
};

module.exports = db;


