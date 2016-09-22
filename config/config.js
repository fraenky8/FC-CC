module.exports = {

    port: process.env.PORT || 3000,

    cache: {
        // The number of entries allowed in the cache is limited.
        size: 10,
        // Every cached item has a Time To Live (TTL)
        ttl: 30 // maximum duration to live
    },

    // free 500MB mongodb @https://mlab.com/
    // current version 3.0 !
    mongodb: {
        host: 'ds035046.mlab.com',
        port: 35046,
        database: 'mlab_fm',
        collection: 'keys',
        user: 'fm',
        password: 'fm123'
    }

};