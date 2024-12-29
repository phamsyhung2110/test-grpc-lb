const express = require('express');
const app = express();
const port = 5001;

app.get('/hello', (req, res) => {
  const name = req.query.name || 'World';
  console.log(`Received HTTP request from ${name}`);
  res.send(`Hello ${name}`);
});

app.listen(port, () => {
  console.log(`Service B (HTTP) is running on port ${port}`);
});
