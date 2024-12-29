const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;
const serviceBUrl = process.env.SERVICE_B_URL || 'http://service-b-http:5001';

app.get('/hello', (req, res) => {
  const name = req.query.name || 'World';
  axios.get(`${serviceBUrl}/hello?name=${name}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.status(500).send('Error calling HTTP service');
    });
});

app.listen(port, () => {
  console.log(`Service A (Proxy) for HTTP is running on port ${port}`);
});
