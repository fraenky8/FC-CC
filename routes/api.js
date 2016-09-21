var express = require('express');
var router = express.Router();
var keys = require('../models/keys');

/**
 * Add an endpoint that returns all stored keys in the cache
 */
router.get('/', function (req, res, next)
{
    keys.getAllStoredKeys()
    .then(function (data)
    {
        res.json(data)
    });
});

/**
 * Add an endpoint that returns the cached data for a given key
 */
router.get('/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'Add an endpoint that returns the cached data for a given key: ' + req.params.key})
});

/**
 * Add an endpoint that creates the data for a given key
 */
router.post('/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'Add an endpoint that creates the data for a given key: ' + req.params.key})
});

/**
 * Add an endpoint that updates the data for a given key
 */
router.put('/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'Add an endpoint that updates the data for a given key: ' + req.params.key})
});

/**
 * Add an endpoint that removes a given key from the cache
 */
router.delete('/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'Add an endpoint that removes a given key from the cache: ' + req.params.key})
});

/**
 * Add an endpoint that removes all keys from the cache
 */
router.delete('/', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'Add an endpoint that removes all keys from the cache'})
});

module.exports = router;
