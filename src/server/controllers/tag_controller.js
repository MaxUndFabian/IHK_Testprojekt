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
    con.query('SELECT * FROM Tags;', function(err, rows){
        if(err){}
        res.json(rows);
    })
}