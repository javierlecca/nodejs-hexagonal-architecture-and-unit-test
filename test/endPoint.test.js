const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/v1/users/')
            .send({
                Name: "Javier Eduardo",
                LastName: "Lecca Cruzado",
                Age: 28
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('Success');
    });
});