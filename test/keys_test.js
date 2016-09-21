var expect = require('chai').expect;
var keys = require('../models/keys');
var db = require('../libs/db').connect();

describe('keys model', function ()
{
    describe('get all keys', function ()
    {
        it('should return all keys', function ()
        {
            var allKeys = keys.getAllStoredKeys();
            allKeys.then(function (data)
            {
                // TODO expect
                console.log(data);
                expect(data).not.be.null();
            });
        });
    });

    describe('get single key', function ()
    {
        it('should return a single key', function ()
        {
            var aKey = keys.getStoredKey(1, function (err, data)
            {
                console.log(err);
                console.log(data);
            });
        });
    });
});