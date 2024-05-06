const express = require('express');
const app = express();
const { exec } = require('child_process');
const { path } = require('path');
const { stdout } = require('process');
const fs=require('fs').promises;
app.use(express.json());
app.post('/api/v1/runContract', (req, res) => 
  {
  const { consumer, provider } = req.body;

  // Construct your Pact test command here
  // Ensure the command accurately points to your test script and uses any necessary flags or configurations

  const pactTestCommand = 'npx jest consumer.test';
  
  exec(pactTestCommand, (error, stdout, stderr) => {
    if (error) {
        console.error('Execution error: ${error.message}');
        if(!res.headersSent){
          return res.status(500).send({ status: 'fail', error: 'Execution Failed', details:error.message });
        } 
    }
    if (stderr) {
        console.log('stderr: ${stderr}');
        if(!res.headersSent){
        return res.status(500).send({ status: 'fail', error: 'error in execution', details:stderr });
        }
    }
    
    //try{
      //const filePath= path.join(--dirname, 'pacts','${consumer}-${provider}-pact.json');
      //const pactContents=await fstat.readFile(filePath,'utf8');
      //const interaction=JSON.parse(pactContents);
    // Assuming stdout will include the results in a JSON format or you'll need to format it as such
   // res.json({
        //consumer: consumer,
        //provider: provider,
   // });

//} catch(readError){
  //console.error('Error reading pact file:${readError}');
 // res.status(500).send({status:'fail', error:'Failed to read pact file'});
//}
}
);
if(!res.headersSent){
console.log('stdout: ${stdout}');

res.send({status:'Success', output:stdout})
}
  }
);


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