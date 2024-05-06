const { Publisher } = require('@pact-foundation/pact');
const path = require('path');

let pactBrokerUrl = "http://localhost:9292"; // Replace with your Pact Broker URL
let consumerVersion = "1.0.0"; // Replace with the current consumer version

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: pactBrokerUrl,
  consumerVersion: consumerVersion,
  tags: ['prod'], // Optional: tag your consumer version, e.g., 'prod' or 'test'
};

new Publisher(opts).publishPacts()
  .then(() => {
    console.log('Pacts successfully published!');
  })
  .catch(e => {
    console.error('Error publishing pacts: ', e);
  });