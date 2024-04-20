const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const modelschema = new Schema({
  status: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  testDuration: {
    type: Number,
    required: true,
  },
  totalSuites: {
    type: Number,
    required: true
  },
  totalTests: {
    type: Number,
    required: true
  },
  totalPassed: {
    type: Number,
    required: true
  },
  totalFailed: {
    type: Number,
    required: true
  },
  totalPending: {
    type: Number,
    required: true
  },
  totalSkipped: {
    type: Number,
    required: true
  },
  component: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  }
}, { timestamps: true 
});

// Create the model from the schema
const Model = mongoose.model('cypressresults', modelschema);
module.exports=Model;

// Export the model
