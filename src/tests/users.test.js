const request = require('supertest');
const app = require('../server');

const jwt = process.env.JWT;

describe('Get Users', () => {
  it('should get users', async () => {
    console.log('Environment is: ' + process.env.NODE_ENV);
    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + jwt);

    expect(res.statusCode).toEqual(200);
  });
});
