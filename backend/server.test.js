const jwt = require('jsonwebtoken');
const app = require('./server');
const request = require('supertest');

let server;

beforeAll((done) => {
  // Start the server on a dynamic port
  server = app.listen(0, () => {
    done();
  });
});

afterAll((done) => {
  // Close the server after all tests have completed
  server.close(done);
});

describe('POST /login', () => {

    test('should return 200 and JWT token for valid credentials', async () => {
        const response = await request(app).post('/login').send({username: 'user', password: 'user'});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        const decoded = jwt.verify(response.body.token, 'secret_key');
        expect(decoded.userId).toBe(1);
    });

    test('should return 401 for invalid credentials', async () => {
        const response = await request(app)
          .post('/login')
          .send({ username: 'invalid', password: 'invalid' });
    
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid username or password');
    });

});