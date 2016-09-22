var express = require('express');
var router = express.Router();
var keys = require('../models/keys');
var randomstring = require("randomstring");
var utils = require('../utils/utils');

var key = 0;

/**
 * Add an endpoint that returns all stored keys in the cache
 */
router.get('/', function (req, res, next)
{
    keys.getAllStoredKeys(function (err, data)
    {
        return err ? res.json(err) : res.json(data);
    });
});

/**
 * Add an endpoint that returns the cached data for a given key
 */
router.get('/:key(\\d+)', function (req, res, next)
{
    key = parseInt(req.params.key, 10);

    keys.getStoredKey(key, function (err, data)
    {
        if (err) return res.json(err);

        if (data.length == 1)
        {
            console.log('Cache hit');
            keys.updateTTL(key, utils.getCurrentTimestamp(), function (err, cursor)
            {
                if (err) return res.json(err);
            });
            return res.json(data[0]);
        }

        console.log('Cache miss');
        var newData = {
            key: utils.getRandomInt(10, 100), // TODO query mongodb to get next higher key
            data: randomstring.generate(128),
            ttl: utils.getCurrentTimestamp()
        };
        keys.createNewKey(newData);
        return res.json(newData);
    });
});

/**
 * Add an endpoint that creates the data for a given key
 */
router.post('/:key(\\d+)', function (req, res, next)
{
    // TODO add cache limit specified in config file --> remove oldest cache item

    key = parseInt(req.params.key, 10);

    var newData = {
        key: utils.getRandomInt(10, 100), // TODO query mongodb to get next higher key
        data: randomstring.generate(128),
        ttl: utils.getCurrentTimestamp()
    };
    keys.createNewKey(newData, function (err, data)
    {
        if (err) return res.json(err);

        return res.json(newData);
    });
});

/**
 * Add an endpoint that updates the data for a given key
 */
router.put('/:key(\\d+)/:data', function (req, res, next)
{
    key = parseInt(req.params.key, 10);

    keys.updateKeyData(key, req.params.data, function (err, data)
    {
        if (err) return res.json(err);

        return res.json(data);
    });
});

/**
 * Add an endpoint that removes a given key from the cache
 */
router.delete('/:key(\\d+)', function (req, res, next)
{
    key = parseInt(req.params.key, 10);

    keys.deleteKey(key, function (err, data)
    {
        if (err) return res.json(err);

        return res.json(data);
    });
});

/**
 * Add an endpoint that removes all keys from the cache
 */
router.delete('/', function (req, res, next)
{
    keys.deleteKeys(function (err, data)
    {
        if (err) return res.json(err);

        return res.json(data);
    });
});

module.exports = router;
