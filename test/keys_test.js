var expect = require('chai').expect;
var keys = require('../models/keys');

describe('keys model', function ()
{
    describe('get all keys', function ()
    {
        it('should return all keys', function ()
        {
            var allKeys = keys.getAllStoredKeys();
            allKeys.then(function (data)
            {
                console.log(data);
            });
        });
    });
});