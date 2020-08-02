// Setup empty JS object to act as endpoint for all routes
projectData = [];

var path = require('path')

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
	res.sendFile(path.resolve('src/client/views/index.html'))
})

// Setup Server
const port = 8081;

const server = app.listen(port, ()=>{
	console.log(`running on localhost: ${port}`)})
	
// Initialize all route with a callback function		
app.get('/all', getAll);

// Callback function to complete GET '/all'
function getAll(request, response) {
	response.send(projectData);
}

// Post Route
app.post('/addData', addData);

// Callback function to complete POST
function addData(request, response){
	newEntry = {
		temperature: request.body.temperature,
		place: request.body.place,
		date: request.body.date,
		userResponse: request.body.userResponse
	}
	projectData.push(newEntry);
	response.send(projectData);
}