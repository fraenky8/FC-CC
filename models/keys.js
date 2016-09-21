var db = require('../libs/db');
var config = require('../config/config');
var utils = require('../utils/utils');

// TODO update TTL

module.exports = {
    getAllStoredKeys: function (callback)
    {
        return db.getDb().collection(config.mongodb.collection).find({}, {
            key: 1,
            _id: 0
        }).toArray(callback);
    },

    getStoredKey: function (key, callback)
    {
        return db.getDb().collection(config.mongodb.collection).find({key: key}).limit(1).toArray(callback);
    },

    createNewKey: function (data, callback)
    {
        // TODO add cache limit specified in config file --> remove oldest cache item
        return db.getDb().collection(config.mongodb.collection).insert(data, callback);
    },

    updateKeyData: function (key, data, callback)
    {
        return db.getDb().collection(config.mongodb.collection).findAndModify(
          {key: key},
          [],
          {
              $set: {
                  data: data,
                  ttl: utils.getCurrentTimestamp()
              }
          },
          {new: true},
          callback);
    },

    deleteKey: function (key, callback)
    {
        return db.getDb().collection(config.mongodb.collection).remove({key: key}, callback)
    },

    deleteKeys: function (callback)
    {
        return db.getDb().collection(config.mongodb.collection).remove({}, callback)
    }
};