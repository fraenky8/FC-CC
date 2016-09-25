'use strict';
const utils = require('../utils/utils');

const dataSize = 8;

let data = [];
for (let i = 1; i <= dataSize; i++)
{
    data.push({
        key: i,
        data: utils.generateRandom128String(),
        ttl: utils.getCurrentTimestamp(i)
    });
}

module.exports = data;