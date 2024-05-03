const { Verifier } = require('@pact-foundation/pact');
const server = require('./server'); // Your API server

let serverInstance;

beforeAll(done => {
  serverInstance = server.listen(5000, ()=>{
  console.log('Server is running on port 8082');
  done();
  });
});


afterAll(done => {
  if(serverInstance){
    serverInstance.close(()=>{
      console.log('Server closed');
      done();
    });
  } 

  
});
jest.setTimeout(10000)

describe('Pact Verification', () => {
  it('validates the expectations of OurConsumer', () => {
    return new Verifier({
      provider: 'YourProvider',
      logLevel: 'INFO',
      pactBrokerUrl: 'http://localhost:9292',
      providerBaseUrl: 'http://localhost:5000',
      publishVerificationResult: true,
      providerVersion: '1.0.0'
    }).verifyProvider();
  });
});