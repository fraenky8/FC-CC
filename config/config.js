'use strict';

const config = {

    port: process.env.PORT || 3000,

    cache: {
        // The number of entries allowed in the cache is limited.
        size: 10,
        // Every cached item has a Time To Live (TTL)
        ttl: 30 // maximum duration to live
    },

    // free 500MB mongodb @https://mlab.com/
    // current (28.09.2016) version 3.2.9
    mongodb: {
        host: 'ds035046.mlab.com',
        port: 35046,
        database: 'mlab_fm',
        collection: 'keys',
        user: 'fm',
        password: 'fm123'
    }

};

module.exports = config;