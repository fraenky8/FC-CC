'use strict';
const express = require('express');
const router = express.Router();
const keys = require('../models/keys');
const utils = require('../utils/utils');

let key = 0;

function keyToInt(key)
{
    return parseInt(key, 10);
};

/**
 * Add an endpoint that returns all stored keys in the cache
 */
router.get('/', (req, res, next) =>
{
    keys.getAllStoredKeys((err, data) => (err ? res.json(err) : res.json(data)));
});

/**
 * Add an endpoint that returns the cached data for a given key
 */
router.get('/:key(\\d+)', (req, res, next) =>
{
    key = keyToInt(req.params.key);

    keys.getStoredKey(key, (err, data) =>
    {
        if (err) return res.json(err);

        if (data.length == 1)
        {
            console.log('Cache hit');
            keys.updateTTL(key, utils.getCurrentTimestamp(), (err, cursor) => (err ? res.json(err) : res.json(data[0])));
            return;
        }

        console.log('Cache miss');
        const newData = {
            key: utils.getRandomInt(10, 100), // TODO query mongodb to get next higher key
            data: utils.generateRandom128String(),
            ttl: utils.getCurrentTimestamp()
        };
        keys.createNewKey(newData, (err, cursor) => (err ? res.json(err) : res.json(newData)));
    });
});

/**
 * Add an endpoint that creates the data for a given key
 */
router.post('/:key(\\d+)', (req, res, next) =>
{
    // TODO add cache limit specified in config file --> remove oldest cache item

    key = keyToInt(req.params.key);

    const newData = {
        key: key,
        data: utils.generateRandom128String(),
        ttl: utils.getCurrentTimestamp()
    };
    keys.createNewKey(newData, (err, cursor) => (err ? res.json(err) : res.json(newData)));
});

/**
 * Add an endpoint that updates the data for a given key
 */
router.put('/:key(\\d+)/:data', (req, res, next) =>
{
    key = keyToInt(req.params.key);

    keys.updateKeyData(key, req.params.data, (err, data) => (err ? res.json(err) : res.json(data)));
});

/**
 * Add an endpoint that removes a given key from the cache
 */
router.delete('/:key(\\d+)', (req, res, next) =>
{
    key = keyToInt(req.params.key);

    keys.deleteKey(key, (err, data) => (err ? res.json(err) : res.json(data)));
});

/**
 * Add an endpoint that removes all keys from the cache
 */
router.delete('/', (req, res, next) =>
{
    keys.deleteKeys((err, data) => (err ? res.json(err) : res.json(data)));
});

module.exports = router;
