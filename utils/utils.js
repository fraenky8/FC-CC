'use strict';
const ts = require('unix-timestamp');
ts.round = true;
const randomstring = require("randomstring");

module.exports = {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/math.random
    getRandomInt: (min, max) =>
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getCurrentTimestamp: (offset) => ts.now(offset),

    generateRandom128String: () => randomstring.generate(128)
};