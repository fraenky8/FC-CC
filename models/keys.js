var db = require('../libs/db');
var config = require('../config/config');


module.exports = {
    getAllStoredKeys: function (callback)
    {
        return db.getDb().collection(config.mongodb.collection).find({}, {
            key: 1,
            _id: 0
        }).toArray(callback);
    },

    getStoredKeys: function (key, callback)
    {

        
        return db.getDb().collection(config.mongodb.collection).find({}, {
            key: 1,
            _id: 0
        }).toArray(callback);
    }
};