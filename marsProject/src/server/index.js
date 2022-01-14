require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// API call to get photo's from Mars
app.get('/getRover', async (req, res) => {
    const rover = req.query.name.toLowerCase()
    let earthDate = "2005-08-08";
    if (rover === 'curiosity') {
        earthDate = "2022-01-01";
    }
    try {
        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&page=1&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send( response.photos )
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Mars app listening on port ${port}!`))