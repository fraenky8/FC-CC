var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');

describe('/keys', function ()
{
    describe('/', function ()
    {
        it('should return error object', function ()
        {
            request(app)
            .post('/keys')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                /*
                    {
                        "error": "404 Not Found",
                        "method": "POST",
                        "path": "/keys"
                    }
                 */
                expect(res).to.have.property('error');
                expect(res).to.have.property('method');
                expect(res).to.have.property('path');

                expect(res.error).to.equal('404 Not Found');
                expect(res.method).to.equal('POST');
                expect(res.path).to.equal('/keys');
            });
        });
    });

    describe('/', function ()
    {
        it('should return all present keys', function ()
        {
            request(app)
            .get('/keys')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                // TODO check keys
            });
        });
    });

    describe('/123', function ()
    {
        it('should return keys=123', function ()
        {
            request(app)
            .get('/keys/123')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                // TODO check key
            });
        });
    });
});