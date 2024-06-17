const { exec } = require('child_process');
const express = require('express');
const axios = require('axios');
const uuid = require('uuid');
const fs = require('fs');
const cypress = require('cypress');
const { storeTestResult } = require('./db');

global.testResults = null;
global.latestTestResult = testResults;

function runCypressCommand(req, res) {
    const VALID_ATTRIBUTE = ["spec", "url", "env"];
    const DATA = req.body;
    const ENV_VAR = {};
    const REQ_ATTRIBUTE = Object.keys(DATA);
    const REQ_VALUE = Object.values(DATA);
    let COUNT = REQ_ATTRIBUTE.length;
    console.log(Object.keys(DATA));
    console.log(Object.values(DATA));
    console.log(DATA.url);

    let isString = value => typeof value === 'string' || value instanceof String;

    for (let i = 0; i < REQ_ATTRIBUTE.length; i++) {
        if (!VALID_ATTRIBUTE.includes(REQ_ATTRIBUTE[i])) {
            console.log("Invalid attribute: ", REQ_ATTRIBUTE[i]);
            res.status(400).json({ status: 'warn', message: 'A query parameter or request attribute is missing or not valid, or the operation is not supported.' });
            return;
        } else if (!isString(REQ_VALUE[i])) {
            console.log("Invalid value: ", REQ_VALUE[i]);
            res.status(400).json({ status: 'warn', message: 'Invalid attribute value, or the operation is not supported.' });
            return;
        }
    }

    if (DATA.env) {
        const KEY_VALUE_PAIR = DATA.env.split(',');
        for (const pair of KEY_VALUE_PAIR) {
            const [key, value] = pair.split('=');
            ENV_VAR[key.trim()] = value.trim();
        }
        console.log(ENV_VAR);
    }

    if (!DATA.url) {
        res.status(400).json({ status: 'warn', message: 'A request attribute is missing: url is not defined' });
        return;
    }

    let cypressCommand = `npx cypress run --config baseUrl=${DATA.url}`;
    let commandConfig = { config: { baseUrl: DATA.url } };

    if (DATA.spec) {
        cypressCommand += ` --spec ${DATA.spec}`;
        commandConfig.spec = DATA.spec;
    }

    if (DATA.env) {
        cypressCommand += ` --env ${DATA.env}`;
        commandConfig.env = ENV_VAR;
    }

    console.log("cypress command generated: ", cypressCommand);

    const targetValue = ENV_VAR["grepTags"] || "@fvt";
    console.log(`The value of "grepTags" is:`, targetValue);

    const randomUUID = uuid.v4();

    cypress.run(commandConfig).then(async testResults => {
        res.setHeader('jobId', '1');
        res.setHeader('Content-Type', 'application/json');
        console.log(new Date());
        console.log("randomUUID: ", randomUUID);

        const resultData = {
            status: testResults.totalFailed === 0 ? "Pass" : "Partial pass",
            message: `Cypress tests executed successfully; Passed: ${testResults.totalPassed}; Failed: ${testResults.totalFailed}`,
            testDuration: testResults.totalDuration,
            TotalSuites: testResults.totalSuites,
            Totaltests: testResults.totalTests,
            TotalPassed: testResults.totalPassed,
            TotalFailed: testResults.totalFailed,
            TotalPending: testResults.totalPending,
            TotalSkipped: testResults.totalSkipped,
            Component: targetValue,
            uuid: randomUUID
        };

        if (testResults.failures) {
            console.error('Could not execute tests');
            console.error(testResults.message);
            res.status(500).json({ status: 'fail', message: testResults.message + " Kindly check your server status or spec path", uuid: randomUUID });
        } else {
            console.log('Test Results:', resultData);
            global.testResults = testResults;

            fs.writeFile('cypress-results.json', JSON.stringify(resultData, null, 2), async (err) => {
                if (err) {
                    console.error('Error writing test result to file:', err);
                    res.status(500).json({ status: 'error', message: 'Failed to write test result to file', uuid: randomUUID });
                } else {
                    try {
                        await storeTestResult(resultData);
                        res.status(testResults.totalFailed === 0 ? 200 : 206).json({ status: resultData.status.toLowerCase(), message: resultData.message, uuid: randomUUID });
                    } catch (dbErr) {
                        console.error('Error inserting test result into MongoDB:', dbErr);
                        res.status(500).json({ status: 'error', message: 'Failed to insert test result into database', uuid: randomUUID });
                    }
                }
            });
        }
    }).catch(err => {
        console.error(err.message);
        res.status(500).json({ status: 'fail', message: err.message, uuid: randomUUID });
    });
}

module.exports = runCypressCommand;