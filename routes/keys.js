var express = require('express');
var router = express.Router();

/**
 * Add an endpoint that returns all stored keys in the cache
 */
router.get('/keys', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'TODO'})
});

/**
 * Add an endpoint that returns the cached data for a given key
 */
router.get('/keys/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'TODO: ' + req.params.key})
});

/**
 * Add an endpoint that creates the data for a given key
 */
router.post('/keys/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'CREATE: ' + req.params.key})
});

/**
 * Add an endpoint that updates the data for a given key
 */
router.put('/keys/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'UPDATE: ' + req.params.key})
});

/**
 * Add an endpoint that removes a given key from the cache
 */
router.delete('/keys/:key', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'DELETE: ' + req.params.key})
});

/**
 * Add an endpoint that removes all keys from the cache
 */
router.delete('/keys', function (req, res, next)
{
    // TODO mongodb
    res.json({'TODO': 'DELETE ALL'})
});

module.exports = router;
