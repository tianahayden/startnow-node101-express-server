// import files and packages up here


// create your express server below
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));


// add your routes and middleware below

var obj = require('./data.json')
app.get('/data', function (req, response) {
    response.type('json');
    response.end(JSON.stringify(obj));
  })




// finally export the express application
module.exports = app;
