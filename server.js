const express = require('express');
const app = express();
const { exec } = require('child_process');
const { path } = require('path');
const fs=require('fs').promises;
app.use(express.json());
app.post('/api/v1/runContract', (req, res) => {
  const { consumer, provider } = req.body;

  // Construct your Pact test command here
  // Ensure the command accurately points to your test script and uses any necessary flags or configurations
  const pactTestCommand = 'npm run test:pact -- --consumer ${consumer} --provider ${provider}';
  const startTime=new Date();
  exec(pactTestCommand, async(error, stdout, stderr) => {
    if (error) {
        console.error('exec error: ${error}');
        return res.status(500).send({ status: 'fail', error: 'exec error: ${error.message}' });
    }
    if (stderr) {
        console.error('stderr: ${stderr}');
        return res.status(500).send({ status: 'fail', error: stderr });
    }
    const endTime=new Date();
    const duration=(endTime-startTime)/1000;
    try{
      const filePath= path.join(--dirname, 'pacts','${consumer}-${provider}-pact.json');
      const pactContents=await fstat.readFile(filePath,'utf8');
      const interaction=JSON.parse(pactContents);
    

    // Assuming stdout will include the results in a JSON format or you'll need to format it as such
    res.json({
        consumer: consumer,
        provider: provider,
        status: 'pass', // or 'fail' based on your test results processing
        duration: '${duration}', // You might need to calculate or extract this
        interaction: interaction// Adjust based on actual output format
    });

} catch(readError){
  console.error('Error reading pact file:${readError}');
  res.status(500).send({status:'fail', error:'Failed to read pact file'});
}
}
);
});


// Define your middleware here (if any)
// app.use(someMiddleware);

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// More route definitions...

// Start the server
const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = server; // Export the server for use in tests or other modules