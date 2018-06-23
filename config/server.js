// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var server     = express();                 // define our server using express
var bodyParser = require('body-parser');
var connection = require('./database')
// configure server to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// START THE SERVER
// =============================================================================
server.listen(port);
console.log('Magic happens on port ' + port);
module.exports = server;

