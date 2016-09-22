var db = require('../libs/db');
var config = require('../config/config');
var utils = require('../utils/utils');

module.exports = {
    getAllStoredKeys: function (callback)
    {
        return db.collection(config.mongodb.collection).find(
          {},
          {
              key: 1,
              _id: 0
          }).toArray(callback);
    },

    getStoredKey: function (key, callback)
    {
        return db.collection(config.mongodb.collection).find({key: key}).limit(1).toArray(callback);
    },

    createNewKey: function (data, callback)
    {
        return db.collection(config.mongodb.collection).insert(data, callback);
    },

    updateKeyData: function (key, data, callback)
    {
        return db.collection(config.mongodb.collection).findAndModify(
          {key: key},
          [],
          {
              $set: {
                  data: data,
                  ttl: utils.getCurrentTimestamp()
              }
          },
          {new: true},
          callback
        );
    },

    updateTTL: function (key, ttl, callback)
    {
        return db.collection(config.mongodb.collection).update(
          {key: key},
          {
              $set: {
                  ttl: parseInt(ttl, 10)
              }
          },
          {},
          callback
        );
    },

    deleteKey: function (key, callback)
    {
        return db.collection(config.mongodb.collection).findAndRemove(
          {key: key},
          [],
          {},
          callback
        );
    },

    deleteKeys: function (callback)
    {
        return db.collection(config.mongodb.collection).remove({}, {}, callback);
    }
};