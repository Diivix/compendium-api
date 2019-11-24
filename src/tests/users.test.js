const request = require('supertest');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = require('../server');

const token = createToken();

describe('Get Users', () => {
  it('should get users', async () => {
    console.log('Environment is: ' + process.env.NODE_ENV);
    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + token);

    expect(res.statusCode).toEqual(200);
  });
});

function createToken() {
  var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
  const options = {
    issuer: 'diivix.com',
    audience: 'diivix.com',
    expiresIn: '1h',
    algorithm: 'RS256'
  };
  const claims = {
    _id: 1,
    sub: 'aegar@compendium.com',
    name: 'aegar',
    role: 'admin',
  };

  return jwt.sign({ claims }, privateKey,  options);
}