(function ()
{
    var MongoClient = require('mongodb').MongoClient;
    var config = require('../config/config');
    var testData = require('../config/db_test_data');

    var url = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database;
    var dbInstance;

    module.exports = {
        connect: function (callback)
        {
            MongoClient.connect(url, function (err, db)
            {
                // make a unique key index
                db.collection(config.mongodb.collection).createIndex({'key': 1}, {unique: true});
                dbInstance = db;
                if (callback) callback(err);
            });
        },
        close: function ()
        {
            MongoClient.close();
        },
        getDb: function ()
        {
            return dbInstance;
        },
        initData: function ()
        {
            dbInstance.collection(config.mongodb.collection).drop(function ()
            {
                dbInstance.collection(config.mongodb.collection).insertMany(testData, function (err, result)
                {
                    // DEBUG
                    console.log(err);
                    console.log(result);
                });
            });
        }
    };

})();

// module.exports = {
//     connect: function (callback)
//     {
//         MongoClient.connect(url, function (err, db)
//         {
//             dbInstance = db;
//             return callback(err);
//         });
//     },
//     close: function ()
//     {
//         MongoClient.close();
//     },
//     getDb: function ()
//     {
//         return dbInstance;
//     },
//     initData: function ()
//     {
//         // DEBUG
//         console.log('initData');
//         var collection = dbInstance.collection(config.mongodb.collection);
//         collection.drop();
//         collection.insertMany(testData, function (err, result)
//         {
//             // DEBUG
//             console.log(err);
//             console.log(result);
//         });
//     }
// };



