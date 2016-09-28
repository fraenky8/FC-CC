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

function createNewKey(key)
{
    return {
        key: key,
        data: utils.generateRandom128String(),
        ttl: utils.getCurrentTimestamp()
    };
}

/**
 * Add an endpoint that returns all stored keys in the cache
 */
router.get('/', (req, res, next) =>
{
    keys.getAllStoredKeys()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that returns the cached data for a given key
 */
router.get('/:key(\\d+)', (req, res, next) =>
{
    key = keyToInt(req.params.key);

    keys.getStoredKey(key)
    .then(data =>
    {
        if (data.length == 1)
        {
            console.log('Cache hit');
            keys.updateTTL(key, utils.getCurrentTimestamp())
            .then(cursor => res.json(data[0]))
            .catch(err => res.json(err));
            return data;
        }

        console.log('Cache miss');
        const newData = createNewKey(key);

        keys.createNewKey(newData)
        .then(data => res.json(newData))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that creates the data for a given key
 */
router.post('/:key(\\d+)', (req, res, next) =>
{
    key = keyToInt(req.params.key);

    keys.getStoredKey(key)
    .then(data =>
    {
        if (data.length == 1)
        {
            return res.json({
                'error': `item with ${key} already exists!`,
                'method': req.method,
                'path': req.path
            });
        }

        // TODO add cache limit specified in config file --> remove oldest cache item


        const newData = createNewKey(key);

        keys.createNewKey(newData)
        .then(data => res.json(newData))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that updates the data for a given key
 */
router.put('/:key(\\d+)/:data', (req, res, next) =>
{
    key = keyToInt(req.params.key);

    keys.updateKeyData(key, req.params.data)
    .then(data => res.json(data.value))
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that removes a given key from the cache
 */
router.delete('/:key(\\d+)', (req, res, next) =>
{
    key = keyToInt(req.params.key);

    keys.deleteKey(key)
    .then(data => res.json(data.value))
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that removes all keys from the cache
 */
router.delete('/', (req, res, next) =>
{
    keys.deleteKeys()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
