const { Pact, Matchers } = require('@pact-foundation/pact');
const { like } = Matchers;
const axios = require('axios');

const provider = new Pact({
  port: 1234,
  log: require('path').resolve(process.cwd(), 'logs', 'pact.log'),
  dir: require('path').resolve(process.cwd(), 'pacts'),
  consumer: 'auth-oidc',
  provider: 'org'
});

describe('Pact with OurProvider', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('when a request to list all users is made', () => {
    beforeAll(() => {
      const interaction = {
        state: 'provider has users data',
        uponReceiving: 'a request for users',
        withRequest: {
          method: 'GET',
          path: '/users'
        },
        willRespondWith: {
          status: 200,
          body: like([{ id: 1, name: 'user' }])
        }
      };
      return provider.addInteraction(interaction);
    });

    it('will receive the list of current users', () => {
      return axios.get('http://localhost:1234/users').then(response => {
        expect(response.data).toEqual([{ id: 1, name: 'user' }]);
      });
    });
  });
});