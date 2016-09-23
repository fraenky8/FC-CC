'use strict';
const utils = require('../utils/utils');

module.exports = [
    {
        "key": 1,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(1)
    },
    {
        "key": 2,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(2)
    },
    {
        "key": 3,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(3)
    },
    {
        "key": 4,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(4)
    },
    {
        "key": 5,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(5)
    },
    {
        "key": 6,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(6)
    },
    {
        "key": 7,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(7)
    },
    {
        "key": 8,
        "data": utils.generateRandom128String(),
        "ttl": utils.getCurrentTimestamp(8)
    }
];