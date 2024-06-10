const { exec } = require('child_process');
const express = require('express');
const axios = require('axios');
const app = express();
const uuid = require('uuid');
const fs=require('fs');

global.testResults=null;
global.latestTestResult=testResults;

module.exports = function runCypressCommand (req, res) {
    const VALID_ATTRIBUTE = ["spec", "url", "env"]
    const DATA = req.body
    const ENV_VAR = {};
    const REQ_ATTRIBUTE = Object.keys(DATA)
    var COUNT = Object.keys(DATA).length;
    console.log(Object.keys(DATA));
    console.log(Object.values(DATA));
    const REQ_VALUE = Object.values(DATA)
    console.log(DATA.url)
    let isString = value => typeof value === 'string' || value instanceof String;

    for (var i = 0; i < REQ_ATTRIBUTE.length; i++) {
        if (!VALID_ATTRIBUTE.includes(REQ_ATTRIBUTE[i])) {
            console.log("Invalid attribute: ", REQ_ATTRIBUTE[i])
            res.status(400).json({ status: 'warn', message: 'A query parameter or request attribute is missing or not valid, or the operation is not supported.' });
            return
        } else if (!isString(REQ_VALUE[i])) {
            console.log("Invalid value: ", REQ_VALUE[i])
            res.status(400).json({ status: 'warn', message: 'Invalid attribute value, or the operation is not supported.' });
            return
        }
    }
    if (DATA.env) {
        const KEY_VALUE_PAIR = DATA.env.split(',');
        for (const pair of KEY_VALUE_PAIR) {
            const [key, value] = pair.split('=');
            ENV_VAR[key.trim()] = value.trim();
        }
        console.log(ENV_VAR)
    }
    if (!DATA.url) {
        res.status(400).json({ status: 'warn', message: 'A request attribute is missing: url is not defined' });
        return
    } else if (DATA.url && !DATA.spec && !DATA.env) {
        var cypressCommand = `npx cypress run --config  baseUrl=${DATA.url}`;
        var commandConfig = {
            config: {
                baseUrl: DATA.url
            }
        }
        console.log("cypress command generated: ", commandConfig)
    }
    else if (DATA.url && DATA.spec && !DATA.env) {
        var cypressCommand = `npx cypress run --spec ${DATA.spec} --config  baseUrl=${DATA.url}`;
        var commandConfig = {
            spec: DATA.spec,
            config: {
                baseUrl: DATA.url
            }
        }
        console.log("cypress command generated: ", cypressCommand)
    }
    else if (DATA.url && DATA.spec && DATA.env) {
        var cypressCommand = `npx cypress run --spec ${DATA.spec} --config  baseUrl=${DATA.url} --env ${DATA.env}`;
        var commandConfig = {
            spec: DATA.spec,
            config: {
                baseUrl: DATA.url
            },
            env: ENV_VAR
        }
        console.log("cypress command generated: ", cypressCommand)
    }
    else if (DATA.url && !DATA.spec && DATA.env) {
        var cypressCommand = `npx cypress run --config  baseUrl=${DATA.url} --env ${DATA.env}`;
        console.log("cypress command generated: ", cypressCommand)
        var commandConfig = {
            config: {
                baseUrl: DATA.url
            },
            env: ENV_VAR
        }
    }
    if ("grepTags" in ENV_VAR) {
        // Get the value of the target key
        var targetValue = ENV_VAR["grepTags"];
        console.log(`The value of "grepTags" is:`, targetValue);
    } else {
        var targetValue = "@fvt"
        console.log(`No specific tag mention, The key "grepTags" is FVT (Full FVT Test).`);
    }
    const cypress = require('cypress')
    cypress.run(commandConfig).then(testResults => {
        res.setHeader('jobId', '1');
        res.setHeader('Content-Type', 'application/json');
        console.log(new Date())
        const randomUUID = uuid.v4();
        console.log("randomUUID: ",randomUUID)
        if (testResults.failures) {
            console.error('Could not execute tests');
            console.error(testResults.message);
            res.status(500).json({ status: 'fail', message: testResults.message + " Kindly check your server status or spec path" });
        } else if (testResults.totalFailed !== 0) {
            console.log('passed %d tests, failed %d tests', testResults.totalPassed, testResults.totalFailed);
            console.log('Test Results:', {
                "status": "Partial pass",
                "message": 'Cypress tests executed successfully; Passed: ' + testResults.totalPassed + '; Failed: ' + testResults.totalFailed,
                "testDuration": testResults.totalDuration,
                "TotalSuites": testResults.totalSuites,
                "Totaltests": testResults.totalTests,
                "TotalPassed": testResults.totalPassed,
                "TotalFailed": testResults.totalFailed,
                "TotalPending": testResults.totalPending,
                "TotalSkipped": testResults.totalSkipped,
                "Component": targetValue,
                "uuid": randomUUID
            });
            global.testResults = testResults;
            const testResultsString = JSON.stringify(testResults, null, 2);
            fs.writeFile('cypress-results.json', testResultsString, (err) => {
                if (err) {
                    console.error('Error writing test result to file:', err);
                    res.status(500).json({ status: 'error', message: 'Failed to write test result to file' });
                } else {
                    res.status(206).json({ status: 'partial-pass', message: 'Cypress tests executed successfully; Passed: ' + testResults.totalPassed });
                }
            });
//          res.status(206).json({ status: 'partial-pass', message: 'Cypress tests executed partially; Passed: ' + testResults.totalPassed + '; Failed: ' + testResults.totalFailed });
        } else {
            console.log('passed %d tests, failed %d tests', testResults.totalPassed, testResults.totalFailed);
            console.log('Test Results:', {
                "status": "Pass",
                "message": 'Cypress tests executed successfully; Passed: ' + testResults.totalPassed + '; Failed: ' + testResults.totalFailed,
                "testDuration": testResults.totalDuration,
                "TotalSuites": testResults.totalSuites,
                "Totaltests": testResults.totalTests,
                "TotalPassed": testResults.totalPassed,
                "TotalFailed": testResults.totalFailed,
                "TotalPending": testResults.totalPending,
                "TotalSkipped": testResults.totalSkipped,
                "Component": targetValue,
                "uuid": randomUUID
            });
            global.testResults = testResults;
            const testResultsString = JSON.stringify(testResults, null, 2);
            fs.writeFile('cypress-results.json', testResultsString, (err) => {
                if (err) {
                    console.error('Error writing test result to file:', err);
                    res.status(500).json({ status: 'error', message: 'Failed to write test result to file' });
                } else {
                    res.status(200).json({ status: 'pass', message: 'Cypress tests executed successfully; Passed: ' + testResults.totalPassed });
                    res.json(testResults);
                }
            });
           module.exports = runCypressCommand;
        }
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({ status: 'fail', message: err.message });
    });
}