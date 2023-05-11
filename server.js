const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
// const fetch = require('node-fetch');


const app = express();
const API_URL = 'https://aa.usno.navy.mil/api/rstt/oneday?' // Replace this URL with your own

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use("/", express.static(path.join(__dirname, "Client")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000/api"); // Replace * with the domain and port of your application
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/api', async (req, res) => {

    let reqObj =  req.body;

    console.log("date" + reqObj.date);
    console.log("coordinates" + reqObj.coords);


  const response = await fetch(`${API_URL}date=${reqObj.date}&coords=${reqObj.coords}`);
  // const response = await fetch(`${API_URL}date=2023-05-05&coords=55,71`);


  const data = await response.json();

 console.log(data);

 res.send(data);

});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`listening on ${PORT}`));