const { Verifier } = require('@pact-foundation/pact');
const server = require('./server'); // Your API server

let serverInstance;

beforeAll(done => {
  serverInstance = server.listen(8080, done);
});

afterAll(done => {
  serverInstance.close(done);
});

describe('Pact Verification', () => {
  it('validates the expectations of OurConsumer', () => {
    return new Verifier({
      provider: 'YourProvider',
      logLevel: 'INFO',
      pactBrokerUrl: 'http://localhost:9292',
      providerBaseUrl: 'http://localhost:8081',
      publishVerificationResult: true,
      providerVersion: '1.0.0'
    }).verifyProvider();
  });
});