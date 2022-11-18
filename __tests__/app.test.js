const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  first_name: 'Test',
  last_name: 'User',
  email: 'example@test.com',
  password: 123456,
};

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});

it.skip('create new user', async () => {
  const res = await (
    await request(app).post('/api/v1/users')
  ).setEncoding(mockUser);
  const { firstName, lastName, email } = mockUser;
  expect(res.body).toEqual({
    id: expect.any(String),
    firstName,
    lastName,
    email,
  });
});
