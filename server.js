const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');

const app = express();
const API_URL = 'https://aa.usno.navy.mil/api/rstt/oneday?'; // Replace this URL with your own

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // Allow the specified HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the specified headers
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/api', (req, res) => {
  let reqObj = req.body;

  console.log("date: " + reqObj.date);
  console.log("coordinates: " + reqObj.coords);

  const url = `${API_URL}date=${reqObj.date}&coords=${reqObj.coords}`;

  const client = url.startsWith('https') ? https : http;

  const request = client.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Error: Failed to retrieve data from ${url}. Status code: ${response.statusCode}`);
      res.sendStatus(response.statusCode);
      return;
    }

    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const result = JSON.parse(data);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error(`Error: Failed to parse data from ${url}. Error: ${error.message}`);
        res.sendStatus(500);
      }
    });
  });

  request.on('error', (error) => {
    console.error(`Error: Failed to retrieve data from ${url}. Error: ${error.message}`);
    res.sendStatus(500);
  });

  request.end();
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
