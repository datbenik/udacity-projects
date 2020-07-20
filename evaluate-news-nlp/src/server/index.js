var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const cors = require('cors');
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const fetch = require("node-fetch");

// Aylien news api
const baseURL = 'https://api.aylien.com/news/stories?language=en&text=';
const app_id = process.env["API_ID"];
const app_key = process.env["API_KEY"];

const app = express()

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/getNews', function (req, res) {
	console.log("Get news stories with search argument: ", req.body.text);
    getData(req.body.text)
	.then(function(data) {
		res.send(data);
	})
	.catch(function(reason) {
		console.log(`error in server getting news ${reason}`); 
	});
})


const getData = async (text) => {
  const res = await fetch(baseURL+text, {
        method: 'GET', 
        mode: 'cors', 
        headers: { 
            'X-AYLIEN-NewsAPI-Application-ID': process.env["API_ID"], 
            'X-AYLIEN-NewsAPI-Application-Key': process.env["API_KEY"]
		}
  });
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch(error) {
    console.log(`error in server when calling news api ${error}`);
  }
}



