var mysql = require('mysql');
var dbConfig = require('../config/db_config.js');

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports.single = function(req, res){
    con.query('SELECT title, content, tag_id FROM Grouppage WHERE id = ?;', [req.params.id], function(err, rows){
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        else{
            res.json(rows[0]);
        }
    });
}

module.exports.update = function(req, res){
    console.log(req.body);
    con.query('UPDATE Grouppage SET title = ?, content = ?, tag_id = ? WHERE id = ?;', [req.body.title, req.body.content, req.body.tag_id, req.params.id], function(err, rows){
       if(err){
           console.log(err);
       } 
       res.json(rows[0]);
    });
}

module.exports.titleList = function(req, res){
    
    console.log('this works');
    
    con.query('SELECT id, title FROM Grouppage;', function(err, rows){
        if(err){
            console.log(err);
        }
        else{
           res.json(rows);
        }
    });
}