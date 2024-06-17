const express = require('express');
const bodyParser = require('body-parser');
const runCypressCommand = require('./apis/cypressRunApi');
const runSetupCommand = require('./apis/runSetup');
const { startDockerCompose, runDockerExec } = require('./apis/dockerRunCommands');
const db = require('./apis/db');

const cors = require('cors');
const fs=require('fs');

const app = express();
const port = 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const router=express.Router();
module.exports=router;

const mongoString = "mongodb://localhost:27017/testPortal"

app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),bodyParser.json(), bodyParser.urlencoded({ extended: true }), express.json());

app.post('/api/v1/runCypress', runCypressCommand);

app.post('/api/v1/runContract', (req, res) => {
    const { consumer, producer } = req.body;
    const composeFilePath = '';
    const containerId = 'elie';
    const consumerCommand = '';
    const providerCommand = '';
    const contractFile = '';
    const contractDestFile = '';

    if (!consumer || !producer) {
        res.status(400).json({ status: 'fail', message: 'Missing required parameters' });
        return;
    }
    const target = '';

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
                                        res.status(200).json({ status: 'success', interactions: prettyContent, message: 'Contract validation successful' });
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

app.post('/api/v1/test-result', async (req, res) => {
    const testResult = req.body;
    testResult.runId = uuidv4();
    testResult.timestamp = new Date();

    try {
        await db.storeTestResult(testResult);
        res.status(201).send({ message: 'Test result stored', runId: testResult.runId });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/api/v1/test-results', async (req, res) => {
    try {
        const allResults = await db.getAllResults();
        res.status(200).send(allResults);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/api/v1/test-results/passed', async (req, res) => {
    try {
        const passedResults = await db.getPassedResults();
        res.status(200).send(passedResults);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/api/v1/test-results/failed', async (req, res) => {
    try {
        const failedResults = await db.getFailedResults();
        res.status(200).send(failedResults);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/api/v1/test-results/run/:runId', async (req, res) => {
    const { runId } = req.params;

    try {
        const runResults = await db.getResultsByRunId(runId);
        res.status(200).send(runResults);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/api/v1/test-results/latest', async (req, res) => {
    const limit = parseInt(req.query.limit) || 1; // Default to 1 if not specified

    try {
        const latestRuns = await db.getLatestRuns(limit);
        res.status(200).send(latestRuns);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});