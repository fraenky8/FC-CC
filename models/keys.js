'use strict';
const db = require('../libs/db');
const config = require('../config/config');
const utils = require('../utils/utils');

module.exports = {
    getAllStoredKeys: (callback) =>
    {
        return db.collection(config.mongodb.collection).find(
          {},
          {
              key: 1,
              _id: 0
          }).toArray(callback);
    },

    getStoredKey: (key, callback) =>
    {
        return db.collection(config.mongodb.collection).find({key: key}).limit(1).toArray(callback);
    },

    createNewKey: (data, callback) =>
    {
        return db.collection(config.mongodb.collection).insert(data, callback);
    },

    updateKeyData: (key, data, callback) =>
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

    updateTTL: (key, ttl, callback) =>
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

    deleteKey: (key, callback) =>
    {
        return db.collection(config.mongodb.collection).findAndRemove(
          {key: key},
          [],
          {},
          callback
        );
    },

    deleteKeys: (callback) =>
    {
        return db.collection(config.mongodb.collection).remove({}, {}, callback);
    }
};