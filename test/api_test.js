'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

// TODO add mockup for replacing concrete db

describe('api tests', () =>
{
    describe('POST /', () =>
    {
        it('should return error object', () =>
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

    describe('GET /', () =>
    {
        it('should return all present keys', () =>
        {
            request(app)
            .get('/keys')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                expect(res).to.have.length.above(0);

                expect(res[0]).to.have.property('key');
                expect(res[0].key).to.not.empty();

            });
        });
    });

    describe('GET /1', () =>
    {
        it('should return key=1', () =>
        {
            request(app)
            .get('/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                /*
                    {
                      "_id": "57e3cd3c4c14cb073058bde6",
                      "key": 1,
                      "data": "Elit laborum eu incididunt officia elit. Eu adipisicing et aute adipisicing tempor deserunt. Ut nostrud quis dolor aliqua id est id excepteur minim nostrud fugiat ex ad aute. Eu do ut officia elit laborum id ullamco nisi proident sunt. Aliqua dolor esse sit minim veniam reprehenderit excepteur proident nulla nisi sunt. Aliquip sint nisi dolor sunt.\r\n",
                      "ttl": 1474547006
                    }
                */
                expect(res).to.have.property('_id');
                expect(res._id).to.not.empty();

                expect(res).to.have.property('key');
                expect(res.key).to.not.empty();

                expect(res).to.have.property('data');
                expect(res.data).to.not.empty();

                expect(res).to.have.property('ttl');
                expect(res.ttl).to.not.empty();
            });
        });
    });

    describe('POST /999', () =>
    {
        it('should return new key=999', () =>
        {
            request(app)
            .post('/999')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                expect(res).to.have.property('_id');
                expect(res._id).to.not.empty();

                expect(res).to.have.property('key');
                expect(res.key).to.not.empty();

                expect(res).to.have.property('data');
                expect(res.data).to.not.empty();

                expect(res).to.have.property('ttl');
                expect(res.ttl).to.not.empty();
            });
        });
    });

    describe('PUT /1', () =>
    {
        it('should update key=1', () =>
        {
            request(app)
            .put('/1/my-foobar-test-data')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                /*
                    {
                        "value": {
                            "_id": "57e3d35caeba790a4c0de52d",
                              "key": 1,
                              "data": "my-foobar-test-data",
                              "ttl": 1474548589
                        },
                        "lastErrorObject": {
                            "updatedExisting": true,
                              "n": 1
                        },
                        "ok": 1
                    }
                */
                expect(res).to.have.property('value');
                expect(res.value).to.not.empty();
                expect(res.value).to.have.property('_id');
                expect(res.value._id).to.not.empty();
                expect(res.value).to.have.property('key');
                expect(res.value.key).to.not.empty();
                expect(res.value).to.have.property('data');
                expect(res.value.data).to.not.empty();
                expect(res.value.data).to.be.equal('my-foobar-test-data');
                expect(res.value).to.have.property('ttl');
                expect(res.value.ttl).to.not.empty();

                expect(res).to.have.property('lastErrorObject');
                expect(res.lastErrorObject).to.not.empty();
                expect(res.lastErrorObject).to.have.property('updatedExisting');
                expect(res.lastErrorObject.updatedExisting).to.not.empty();
                expect(res.lastErrorObject).to.have.property('n');
                expect(res.lastErrorObject.n).to.not.empty();
            });
        });
    });

    describe('DELETE /', () =>
    {
        it('should delete all keys', () =>
        {
            request(app)
            .delete('/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                /*
                    {
                      "ok": 1,
                      "n": 8,
                      "lastOp": "6333143884582879240",
                      "electionId": "57dbf5caa030e98d3d65e631"
                    }
                */
                expect(res).to.have.property('ok');
                expect(res.ok).to.not.empty();

                expect(res).to.have.property('n');
                expect(res.n).to.not.empty();

                expect(res).to.have.property('lastOp');
                expect(res.lastOp).to.not.empty();

                expect(res).to.have.property('electionId');
                expect(res.electionId).to.not.empty();
            });
        });
    });

    describe('DELETE /1', () =>
    {
        it('should delete key=1', () =>
        {
            request(app)
            .delete('/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res)
            {
                if (err) throw err;

                /*
                    {
                      "lastErrorObject": {
                        "n": 1
                      },
                      "value": {
                        "_id": "57e3d7b08553bf16e01fabb6",
                        "key": 1,
                        "data": "Elit laborum eu incididunt officia elit. Eu adipisicing et aute adipisicing tempor deserunt. Ut nostrud quis dolor aliqua id est id excepteur minim nostrud fugiat ex ad aute. Eu do ut officia elit laborum id ullamco nisi proident sunt. Aliqua dolor esse sit minim veniam reprehenderit excepteur proident nulla nisi sunt. Aliquip sint nisi dolor sunt.\r\n",
                        "ttl": 1474549681
                      },
                      "ok": 1
                    }
                */
                expect(res).to.have.property('value');
                expect(res.value).to.not.empty();
                expect(res.value).to.have.property('_id');
                expect(res.value._id).to.not.empty();
                expect(res.value).to.have.property('key');
                expect(res.value.key).to.not.empty();
                expect(res.value).to.have.property('data');
                expect(res.value.data).to.not.empty();
                expect(res.value).to.have.property('ttl');
                expect(res.value.ttl).to.not.empty();

                expect(res).to.have.property('lastErrorObject');
                expect(res.lastErrorObject).to.not.empty();
                expect(res.lastErrorObject).to.have.property('updatedExisting');
                expect(res.lastErrorObject.updatedExisting).to.not.empty();
                expect(res.lastErrorObject).to.have.property('n');
                expect(res.lastErrorObject.n).to.not.empty();
            });
        });
    });
});