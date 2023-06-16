const app = require("express").Router();
const json = require('../../package.json')

app.get("/", (req, res) => {
  res.json({
    service: json.name,
    health: true,
  })
});

module.exports = app;
