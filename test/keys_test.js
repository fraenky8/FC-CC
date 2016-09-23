'use strict';
const expect = require('chai').expect;
const keys = require('../models/keys');

describe('keys model tests', () =>
{
    describe('get all keys', () =>
    {
        it('should return all keys', () =>
        {
            keys.getAllStoredKeys((err, data) =>
            {
                // TODO expect
                console.log(data);
                expect(data).not.be.null();
            });
        });
    });

    describe('get single key = 1', () =>
    {
        it('should return a single key=1', () =>
        {
            keys.getStoredKey(1, (err, data) =>
            {
                console.log(err);
                console.log(data);

                expect(data).not.be.null();
            });
        });
    });

    // TODO add more tests
});