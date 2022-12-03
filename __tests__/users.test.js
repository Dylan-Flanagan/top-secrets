const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

// const mockUser = {
//   first_name: 'Test',
//   last_name: 'User',
//   email: 'example@test.com',
//   password: 123456,
// };

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST api/v1/users should create new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@example.com',
    });
  });

  it('POST /api/v1/users/sessions should log in an existing user', async () => {
    // use the User Service to create a new user
    const mockUser = {
      email: 'test@example.com',
      password: '123456',
    };
    await UserService.create(mockUser);
    // log in that user
    const resp = await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);
    // confirm a 200
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({ message: 'Signed in successfully!' });
  });

  it('/DELETE should return a 401 error when signed out and trying to view /users', async () => {
    const res = await request(app).get('/api/v1/users');
    // console.log(res.body, 'HAHAHA');
    expect(res.body).toEqual({
      message: 'You must be signed in',
      status: 401,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
