var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const cors = require('cors');

const bodyParser = require('body-parser')

var aylien = require("aylien-news-api");
var opts = {}

var defaultClient = AylienNewsApi.ApiClient.instance;

var app_id = defaultClient.authentications["app_id"];
app_id.apiKey = process.env["APP_ID"];

var app_key = defaultClient.authentications["app_key"];
app_key.apiKey = process.env["APP_KEY"];




const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API id is ${process.env.API_ID}`);
console.log(`Your API key is ${process.env.API_KEY}`);

var textapi = new AylienNewsApi.DefaultApi();

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

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully. Returned data: ");
    console.log("========================================");
    for (var i = 0; i < data.stories.length; i++) {
      console.log(data.stories[i].title + " / " + data.stories[i].source.name);
    }
//	res.send(response)
  }
};


app.post('/analyseUrl', function (req, res) {
	console.log("Analysing url: ", req.body.text);
	opts.title = req.body.text;
	api.listStories(opts, callback);

})






