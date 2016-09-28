'use strict';
const express = require('express');
const router = express.Router();
const keys = require('../models/keys');
const utils = require('../utils/utils');
const config = require('../config/config');

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
router.get('/', (req, res) =>
{
    keys.getAllStoredKeys()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that returns the cached data for a given key
 */
router.get('/:key(\\d+)', (req, res) =>
{
    key = keyToInt(req.params.key);

    keys.getStoredKey(key)
    .then(data =>
    {
        // TODO add TTL exceeding functionality

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
router.post('/:key(\\d+)', (req, res) =>
{
    key = keyToInt(req.params.key);
    let newKey = {};

    keys.getStoredKey(key)
    .then(data =>
    {
        if (data.length == 1)
        {
            throw {
                'error': `item with ${key} already exists!`,
                'method': req.method,
                'path': req.path
            };
        }

        return keys.getAllStoredKeys();
    })
    .then(data =>
    {
        if (data.length == config.cache.size)
        {
            // DEBUG
            console.log('cache size exceeded, removing oldest key');
            // remove oldest cache item
            return keys.findOldestKey()
            .then(data =>
            {
                // DEBUG
                console.log('key removed: ', data[0].key);
                return keys.deleteKey(data[0].key);
            });
        }
    })
    .then(() =>
    {
        newKey = createNewKey(key);
        return keys.createNewKey(newKey);
    })
    .then(() => res.json(newKey))
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that updates the data for a given key
 */
router.put('/:key(\\d+)/:data', (req, res) =>
{
    key = keyToInt(req.params.key);

    keys.updateKeyData(key, req.params.data)
    .then(data => res.json(data.value))
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that removes a given key from the cache
 */
router.delete('/:key(\\d+)', (req, res) =>
{
    key = keyToInt(req.params.key);

    keys.deleteKey(key)
    .then(data => res.json(data.value))
    .catch(err => res.json(err));
});

/**
 * Add an endpoint that removes all keys from the cache
 */
router.delete('/', (req, res) =>
{
    keys.deleteKeys()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
