module.exports = {

    port: process.env.PORT || 3000,

    cache: {
        // The number of entries allowed in the cache is limited.
        size: 10,
        // Every cached item has a Time To Live (TTL)
        ttl: 30 // seconds
    },

    mongodb: {
        host: 'localhost',
        port: '27017',
        database: 'cachedb',
        collection: 'keys'
    }

};