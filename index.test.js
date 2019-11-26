/* eslint-env jest */
const createRouter = require('./index');

describe('methods', () => {
  it('should handle GET request', async () => {
    const router = createRouter();
    router.get('/test', async req => {
      return {
        statusCode: 200,
      };
    });
    const res = await router.handle({
      httpMethod: 'GET',
      path: '/test',
    });
    expect(res.statusCode).toBe(200);
  });

  it('should handle POST request', async () => {
    const router = createRouter();
    router.post('/test', async req => {
      return {
        statusCode: 200,
      };
    });
    const res = await router.handle({
      httpMethod: 'POST',
      path: '/test',
    });
    expect(res.statusCode).toBe(200);
  });

  it('should handle any method', async () => {
    const router = createRouter();
    router.any('/test', async req => {
      return {
        statusCode: 200,
      };
    });
    const res = await router.handle({
      httpMethod: 'CUSTOMMETHOD',
      path: '/test',
    });
    expect(res.statusCode).toBe(200);
  });
});

describe('req object - url params', () => {
  it('should return a request object with named params', async () => {
    const router = createRouter();
    router.get('/test/:foo/:bar', async req => {
      expect(req.params.foo).toBe('funky');
      expect(req.params.bar).toBe('town');
      return {
        statusCode: 200,
      };
    });
    await router.handle({
      httpMethod: 'GET',
      path: '/test/funky/town',
    });
  });
});
