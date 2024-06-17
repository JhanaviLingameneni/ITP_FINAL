const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/testPortal";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

async function connectDB() {
    if (!database) {
        await client.connect();
        database = client.db('testPortal');
    }
    return database;
}

async function storeTestResult(testResult) {
    const db = await connectDB();
    const results = db.collection('testResults');
    return results.insertOne(testResult);
}

async function getAllResults() {
    const db = await connectDB();
    const results = db.collection('testResults');
    return results.find({}).toArray();
}

async function getPassedResults() {
    const db = await connectDB();
    const results = db.collection('testResults');
    return results.find({ status: 'passed' }).toArray();
}

async function getFailedResults() {
    const db = await connectDB();
    const results = db.collection('testResults');
    return results.find({ status: 'failed' }).toArray();
}

async function getResultsByRunId(runId) {
    const db = await connectDB();
    const results = db.collection('testResults');
    return results.find({ runId }).toArray();
}

async function getLatestRuns(limit = 1) {
    const db = await connectDB();
    const results = db.collection('testResults');
    return results.find().sort({ timestamp: -1 }).limit(limit).toArray();
}

module.exports = {
    storeTestResult,
    getAllResults,
    getPassedResults,
    getFailedResults,
    getResultsByRunId,
    getLatestRuns
};