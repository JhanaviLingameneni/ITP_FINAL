const express = require('express');
const bodyParser = require('body-parser');
const runCypressCommand = require('./apis/cypressRunApi');
const cors = require('cors');
const fs=require('fs');
let latestTestResults=null;

const app = express();
const port = 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const router=express.Router();
module.exports=router;

const mongoString = "mongodb://localhost:27017/abc"


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),bodyParser.json(), bodyParser.urlencoded({ extended: true }), express.json());

app.post('/api/v1/runCypress', runCypressCommand);

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/test-results', (req,res)=> {
    fs.readFile('cypress-results.json', 'utf8', (err,data)=>{
        if(err){
            res.status(500).send('unable to read test results');
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
    });


