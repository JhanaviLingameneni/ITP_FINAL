const express = require('express');
const bodyParser = require('body-parser');
const runCypressCommand = require('./apis/cypressRunApi');
const runSetupCommand = require('./apis/runSetup');
const { startDockerCompose, runDockerExec } = require('./apis/dockerRunCommands');

const cors = require('cors');
const fs=require('fs');
let allResults=[];
const app = express();
const port = 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const router=express.Router();
module.exports=router;

const mongoString = "mongodb://localhost:27017/abc"

app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),bodyParser.json(), bodyParser.urlencoded({ extended: true }), express.json());

app.post('/api/v1/runCypress', runCypressCommand);
app.post('/api/v1/runCypress', (req, res) => {
    const newResults = req.body;
  console.log('Received new results:', newResults);

  // Read existing results from the file
  fs.readFile(resultsFilePath, 'utf8', (readErr, data) => {
    if (readErr && readErr.code !== 'ENOENT') {
      console.error('Error reading results file:', readErr);
      return res.status(500).send('Failed to read results');
    }

    console.log('Existing data read from file:', data);
    let allResults = [];
    if (data) {
      try {
        allResults = JSON.parse(data);
        console.log('Parsed existing results:', allResults);
      } catch (parseErr) {
        console.error('Error parsing results file:', parseErr);
        return res.status(500).send('Failed to parse results');
      }
    }

    // Append new results to the existing results
    allResults.push(newResults);
    console.log('Updated results:', allResults);

    // Write updated results back to the file
    fs.writeFile(resultsFilePath, JSON.stringify(allResults, null, 2), writeErr => {
      if (writeErr) {
        console.error('Error writing results file:', writeErr);
        return res.status(500).send('Failed to store results');
      }

      console.log('Results written to file successfully');
      res.send('Results stored successfully');
    });
  });
  });

app.post('/api/v1/runContract', (req, res) => {
    const { consumer, provider } = req.body;
    const composeFilePath = '/root/XC1/dev-tools/test/docker-compose.yaml';
    const containerId = 'elie';
    const consumerCommand = 'cd /pz-projects/xc1p-auth-oidc/sourceCode ; npm run test:contract || echo Failed ; bash';
    const providerCommand = 'cd /pz-projects/xc1p-organizations/sourceCode ; npm run test:contract || echo Failed ; bash';
    const contractFile = '/root/XC1/xc1p-auth-oidc/sourceCode/pacts/auth-oidc-organizations.json';
    const contractDestFile = '/root/XC1/xc1p-organizations/sourceCode/pacts/auth-oidc-organizations.json';

    if (!consumer || !producer) {
        res.status(400).json({ status: 'fail', message: 'Missing required parameters' });
        return;
    }
    const target = '10.241.35.12';

    runSetupCommand(target, (err1, output) => {
        if (err1) {
            console.error(`Error running setup command: ${err1.message}`);
            res.status(500).json({ status: 'fail', message: err1.message });
            return;
        }

        console.log('Setup Command output:');
        console.log(output);

        startDockerCompose(composeFilePath, (err) => {
            if (err) {
                console.error('Error starting Docker Compose:', err);
                res.status(500).send('Error starting Docker Compose');
                return;
            }

            console.log('Docker Compose started successfully');

            runDockerExec(containerId, consumerCommand, (err, output) => {
                if (err) {
                    console.error('Error running Docker exec:', err);
                    res.status(500).send('Error running Docker exec');
                    return;
                }
                console.log('Command output:', output);
                if (output.includes('failing')) {
                    res.status(500).send('Test execution failed');
                    return;
                }
                setTimeout(() => {
                    fs.copyFile(contractFile, contractDestFile, (err) => {
                        if (err) {
                            callback(new Error('Error copying contract file'));
                            return;
                        }
                        console.log('Copy file successful');
                        setTimeout(() => {
                            runDockerExec(containerId, providerCommand, (err, output) => {
                                if (err) {
                                    console.error('Error running Docker exec:', err);
                                    res.status(500).send('Error running Docker exec');
                                    return;
                                }
                                console.log('Command output:', output);

                                fs.readFile(contractFile, 'utf8', (err, fileContent) => {
                                    if (err) {
                                        console.error('Error reading file:', err);
                                        res.status(500).send('Error reading file');
                                        return;
                                    }
                                    try {
                                        const prettyContent = JSON.stringify(JSON.parse(fileContent), null, 2);
                                        if (output.includes('failing')) {
                                            res.status(500).json({ status: 'failure', interactions: prettyContent, message: 'Contract validation failed' });
                                            return;
                                        }
                                        res.status(200).json({ status: 'success', interactions: prettyContent, message: 'Contract validation successfully' });
                                    } catch (error) {
                                        console.error('Error parsing JSON:', error);
                                        res.status(500).send('Error parsing JSON');
                                    }
                                });
                            });
                        }, 10000);
                    });
                }, 10000);
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors())
app.use(express.json())

const routes = require('./apis/routes')
app.use('/api', routes)
app.get('/api.testResults', async(req,res)=>{
    try{
        const results=await fetchTestResults();
        res.json(results);
    }
    catch(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send('Failed to fetch results');
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/test-results', (req,res)=> {
    fs.readFile('cypress-results.json', 'utf8', (err,data)=>{
        if(err){
            res.status(500).send('unable to read test results');
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            allResults=JSON.parse(data) || [];
            res.send(data);
        }
    });
});
