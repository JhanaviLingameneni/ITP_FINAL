const express = require('express');
const app = express();

// Define your middleware here (if any)
// app.use(someMiddleware);

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// More route definitions...

// Start the server
const server = app.listen(8081, () => {
  console.log('Server is running on port 8081');
});

module.exports = server; // Export the server for use in tests or other modules