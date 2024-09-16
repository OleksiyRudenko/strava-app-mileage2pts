// defining the server port
const port = 5000

// initializing installed dependencies
const express = require('express')
require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
app.use(cors())

// listening for port 5000
app.listen(5000, ()=> console.log(`Server is running on ${port}` ))

// API request
app.get('/', (req,res)=>{
  const options = {
    method: 'GET',
    url: 'https://strava.com/api/v3/',
    headers: {
      'Authorization': `Bearer process.env.STRAVA_API_KEY`,
    }
  }

  axios.request(options).then(response =>
    res.json(response.data)
  ).catch(error =>
    console.error(error)
  )
})
