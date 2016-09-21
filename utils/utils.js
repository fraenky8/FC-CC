var ts = require('unix-timestamp');
ts.round = true;

module.exports = {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/math.random
    getRandomInt: function (min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getCurrentTimestamp: function (offset)
    {
        return ts.now(offset)
    }
};