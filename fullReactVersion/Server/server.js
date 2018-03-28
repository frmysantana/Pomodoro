const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

// Express middleware, serves public's content whenever a request is made
// to the server.
app.use(express.static(publicPath));

app.listen(port, ()=> {
  console.log('Server is up!');
});