var express = require('express');
var app = express();
app.use(express.static('./public'));

var bodyParser = require("body-parser");
const url = require('url');
const path = require('path');
// var mustacheExpress = require('mustache-express');

app.use(bodyParser.urlencoded({
  extended: false
}));

const PORT = process.env.PORT || 8000;
var {
  Client
} = require('pg');
var client;

client = new Client({
  database: 'inclass3'
});

client.connect();

app.post('/log', function(req, res) {
  // console.log(JSON.stringify(req.body, null, null));
  // var data = req.body;
  console.log(req.body);

  client.query('INSERT INTO neural (nodes, mutation, generation) VALUES ($1, $2, $3)', [req.body.nodes, req.body.mutation, req.body.generation], function(error, results) {
    if (error) {
      console.log(error);
    }
    console.log('success!');
  });
});

app.get('/', function(req, res1) {
  client.query('SELECT * FROM posts', function(err, res2) {
    if (err) {
      console.log(error);
    }
    for (let row of res2.rows) {
      console.log(JSON.stringify(row));
    }
  });

});

app.listen(PORT, function() {
  console.log('Server up! Listening on port: ' + PORT);
});