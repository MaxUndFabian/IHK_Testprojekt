var express = require('express');
var bodyParser = require('body-parser');
var newsController = require('./server/controllers/news_controller');
var app = express();

app.use('/client', express.static('client'));
app.use('/app', express.static('client/ts'));


app.use(bodyParser());

// 
app.post('/api/news', newsController.create);
app.put('/api/news/:id', newsController.update)
app.get('/api/news', newsController.list);
app.get('/api/news/:id', newsController.single);
app.delete('/api/news/:id', newsController.delete);


app.use(function(req, res){
   res.sendFile(__dirname + "/client/index.html"); 
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});