var expect = require('chai').expect;
var keys = require('../models/keys');

describe('keys model tests', function ()
{
    describe('get all keys', function ()
    {
        it('should return all keys', function ()
        {
            keys.getAllStoredKeys(function (err, data)
            {
                // TODO expect
                console.log(data);
                expect(data).not.be.null();
            });
        });
    });

    describe('get single key = 1', function ()
    {
        it('should return a single key=1', function ()
        {
            keys.getStoredKey(1, function (err, data)
            {
                console.log(err);
                console.log(data);

                expect(data).not.be.null();
            });
        });
    });

    // TODO add more tests
});