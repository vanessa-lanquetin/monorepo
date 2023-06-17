const app = require('express').Router()

app.use('/health', require('./health'))

module.exports = app