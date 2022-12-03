const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const UserService = require('../lib/services/UserService.js');

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/secrets should return a 401 if the user is not logged in', async () => {
    const resp = await request(app).get('/api/v1/secrets');
    expect(resp.status).toEqual(401);
  });

  it('GET /api/v1/secrets should return a list of secrets if user is logged in', async () => {
    // use the User Service to create new user
    const mockUser = {
      email: 'test@example.com',
      password: '123456',
    };
    await UserService.create(mockUser);
    const agent = request.agent(app);
    // log in that user
    await agent.post('/api/v1/users/sessions').send(mockUser);
    // request the secrets
    const resp = await agent.get('/api/v1/secrets');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: expect.any(String),
        title: 'Shhhhh',
        description: 'Top Secret: I am an idiot',
        created_at: expect.any(String),
      },
      {
        id: expect.any(String),
        title: 'Hey',
        description: 'The joke about the cake in Portal',
        created_at: expect.any(String),
      },
    ]);
  });
});
