var mysql = require('mysql');
var dbConfig = require('../config/db_config.js');

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports.create = function(req, res){
    con.query('INSERT INTO Users (username, password, email, firstname, lastname, role_id) VALUES (?, ?, ?, ?, ?, 3)', [req.body.username, req.body.password, req.body.email, req.body.firstname, req.body.lastname], function(err, rows){
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        else{
            res.sendStatus(200);
        }
    });
}