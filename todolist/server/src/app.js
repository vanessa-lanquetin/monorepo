const express = require("express");
const cors = require("cors");

const app = express();

console.log("Enable cors...");
app.use(cors());

app.use('/api/v1', require('./controllers/v1'))

module.exports = app
