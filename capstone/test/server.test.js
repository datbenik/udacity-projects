const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Test endpoint', () => {
    it ('It should return html file', async done => {
        const res =  await request.get('/')
        expect(res.status).toBe(200);
        done();
    })
})