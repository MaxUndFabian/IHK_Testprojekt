var mysql = require('mysql');
var dbConfig = require('../config/db_config.js');

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports.list = function(req, res){
    con.query('SELECT c.id, c.content, c.creationDate date, c.author_username username FROM comment as c WHERE c.newsentry_id = ?;', [req.params.id], function(err, rows){
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        else{
            res.json(rows);            
        }
    })
}

module.exports.create = function(req, res){
    console.log(req.body);
    console.log(req.body.content);
    con.query('INSERT INTO comment (content, author_username, newsentry_id) VALUES (?, ?, ?);', [req.body.content, req.session.username, req.params.id], function(err, rows){
       if(err){
           console.log(err);
       } 
       res.sendStatus(200);
    });
}