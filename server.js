// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require("path");
 const fetch = require('node-fetch');


// const app = express();
// const API_URL = 'https://aa.usno.navy.mil/api/rstt/oneday?' // Replace this URL with your own

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// // app.use("/", express.static(path.join(__dirname, "Client")));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://192.168.2.228:8082/api"); 
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



// app.post('/api', async (req, res) => {

//     let reqObj =  req.body;

//     console.log("date" + reqObj.date);
//     console.log("coordinates" + reqObj.coords);


//   const response = await fetch(`${API_URL}date=${reqObj.date}&coords=${reqObj.coords}`);
//   // const response = await fetch(`${API_URL}date=2023-05-05&coords=55,71`);


//   const data = await response.json();

//  console.log(data);

//  res.send(data);

// });

// const PORT = process.env.PORT || 8082;
// app.listen(PORT, () => console.log(`listening on ${PORT}`));




const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const path = require("path");

const app = express();
const API_URL = 'https://aa.usno.navy.mil/api/rstt/oneday?'; // Replace this URL with your own

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://192.168.2.228:8082/api');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://phases-api.onrender.com/api"); 
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Origin", "http://27.109.14.76:808"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api', (req, res) => {
  let reqObj = req.body;

  console.log("date: " + reqObj.date);
  console.log("coordinates: " + reqObj.coords);

  const url = `${API_URL}date=${reqObj.date}&coords=${reqObj.coords}`;

  // const options = {
  //   rejectUnauthorized: false // Ignore SSL certificate errors
  // };

  const client = url.startsWith('https') ? https : http;
  const request = client.get(url,  (response) => {
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



// const express = require('express');
// const bodyParser = require('body-parser');
// const https = require('https');
// const http = require('http');
// const path = require("path");

// const app = express();
// const API_URL = 'https://aa.usno.navy.mil/api/rstt/oneday?'; // Replace this URL with your own

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://192.168.2.228:8082/api');
//   next();
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://192.168.2.228:8082/api"); // Replace * with the domain and port of your application
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.post('/api', (req, res) => {
//   let reqObj = req.body;

//   console.log("date: " + reqObj.date);
//   console.log("coordinates: " + reqObj.coords);

//   const url = `${API_URL}date=${reqObj.date}&coords=${reqObj.coords}`;

//   const client = url.startsWith('https') ? https : http;

//   const options = {
//     rejectUnauthorized: false // Ignore SSL certificate errors
//   };

//   const request = client.get(url, options, (response) => {
//     if (response.statusCode !== 200) {
//       console.error(`Error: Failed to retrieve data from ${url}. Status code: ${response.statusCode}`);
//       res.sendStatus(response.statusCode);
//       return;
//     }

//     let data = '';
//     response.on('data', (chunk) => {
//       data += chunk;
//     });

//     response.on('end', () => {
//       try {
//         const result = JSON.parse(data);
//         console.log(result);
//         res.send(result);
//       } catch (error) {
//         console.error(`Error: Failed to parse data from ${url}. Error: ${error.message}`);
//         res.sendStatus(500);
//       }
//     });
//   });

//   request.on('error', (error) => {
//     console.error(`Error: Failed to retrieve data from ${url}. Error: ${error.message}`);
//     res.sendStatus(500);
//   });

//   request.end();
// });

// const PORT = process.env.PORT || 8082;
// app.listen(PORT, () => console.log(`Listening on ${PORT}`));
