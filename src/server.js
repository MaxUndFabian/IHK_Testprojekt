var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var newsController = require('./server/controllers/news_controller');
var tagController = require('./server/controllers/tag_controller');
var loginController = require('./server/controllers/login_controller');

var auth = require('./server/auth/authenticate');

var app = express();

app.use('/client', express.static('client'));
app.use('/app', express.static('client/ts'));


app.use(bodyParser());
app.use(session({secret: 'JH3BFID73478H34JdfsBk873487'/*, cookie: {maxAge: 7200000}*/})); // 2 Stunden

app.use(function(req, res, next){
   console.log();
   console.log();
   console.log('session cookie: ');
   console.log(req.session);
   console.log();
   console.log();
   next();
});

// routing of my api
app.post('/api/news', auth.requireLoginWithRole('Redakteur'), newsController.create);
app.put('/api/news/:id', newsController.update);
app.get('/api/news', newsController.list);
app.get('/api/news/:id', auth.requireLogin, newsController.single);
app.delete('/api/news/:id', newsController.delete);

app.post('/api/login', loginController.login);
app.get('/api/logout', loginController.logout);

app.get('/api/tags', auth.requireLoginWithRole('Redakteur'), tagController.list);


app.use(function(req, res){
   res.sendFile(__dirname + "/client/index.html"); 
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});