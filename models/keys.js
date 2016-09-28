'use strict';
const config = require('../config/config');
const db = require('../libs/db');
const utils = require('../utils/utils');

module.exports = {
    getAllStoredKeys: () =>
    {
        return db.collection(config.mongodb.collection).find(
          {},
          {
              key: 1,
              _id: 0
          }).toArray();
    },

    getStoredKey: (key) =>
    {
        return db.collection(config.mongodb.collection).find({key: key}).limit(1).toArray();
    },

    createNewKey: (data) =>
    {
        return db.collection(config.mongodb.collection).insertOne(data);
    },

    updateKeyData: (key, data) =>
    {
        return db.collection(config.mongodb.collection).findOneAndUpdate(
          {key: key},
          {
              $set: {
                  data: data,
                  ttl: utils.getCurrentTimestamp()
              }
          },
          {returnOriginal: false}
        );
    },

    updateTTL: (key, ttl) =>
    {
        return db.collection(config.mongodb.collection).updateOne(
          {key: key},
          {
              $set: {
                  ttl: parseInt(ttl, 10)
              }
          }
        );
    },

    deleteKey: (key) =>
    {
        return db.collection(config.mongodb.collection).findOneAndDelete(
          {key: key}
        );
    },

    deleteKeys: () =>
    {
        return db.collection(config.mongodb.collection).deleteMany({});
    },

    findOldestKey: () =>
    {
        return db.collection(config.mongodb.collection).find().sort({'ttl': 1}).limit(1).toArray();
    }
};