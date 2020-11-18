// import module express
var express = require('express');

//create express application
var app = express();

// definition of route, and response for req GET HTTP
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Run server to listen on port 3000 and type out logs on console
app.listen(3000, function() { console.log('Example app listening on port 3000!') })