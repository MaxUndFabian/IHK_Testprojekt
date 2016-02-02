var express = require('express');
var app = express();

app.use('/client', express.static('client'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});