const express = require('express')
const { Router } = require('express')
const app = Router()

const axios = require('axios').default
const path = require('path')
const cors = require('cors')
const helmet = require('helmet').default
const compression = require('compression')

require('express-async-errors')
const apikeyORS = process.env.OPEN_ROUTE_SERVICE
if(!apikeyORS) {
  console.error(JSON.stringify({ error: `Env: process.env.OPEN_ROUTE_SERVICE not found`}))
}
app
  .use(cors())
  .use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'", 'https://api.openweathermap.org'],
          'img-src': ["'self'", 'https://openweathermap.org'],
          'object-src': ["'self'", 'https://openweathermap.org']
        }
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  )
  .use(compression())
  .get('/api/reverse-geocoding', async (req, res) => {
    const { data: autocomplete } = await axios.get(
      'https://api.openrouteservice.org/geocode/autocomplete',
      {
        params: {
          text: req.query.city,
          size: 5 
        },
        headers: {
          'Accept-Language': 'fr-FR', 
          Authorization: apikeyORS
        }
      }
    )
    res.json(autocomplete)
  })
  .get('/api/*', (req, res, next) => {
    res.status(404)
    next(new Error())
  })
  .use(express.static(path.resolve(__dirname, '..', 'dist')))
  .use((req, res) => {
    res.type('.html').sendFile(path.resolve(__dirname, '..', 'index.html'))
  })

module.exports = app