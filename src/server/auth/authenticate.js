var session = require('express-session');
var mysql = require('mysql');

var dbConfig = require('../config/db_config.js');

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports.requireLogin = function(req, res, next){
    var sess = req.session;
    if(sess.loggedIn && sess.username){
        next();
    }
    else{
        res.sendStatus(401);    
    }
}

module.exports.requireLoginWithRole = function(role){
    return function(req, res, next){
        var sess = req.session;
        if(sess.loggedIn){
            con.query("SELECT r.title FROM Roles as r left join Users user on (r.id=user.role_id) WHERE user.username = ?;", [sess.username], function(err, rows){
                if(err){
                    //TODO handle error
                    console.log("db error in requireLoginWithRole()");
                    console.log(err);
                }
                // if user has required Role, grant access
                // TODO check this with role_id or name ????????
                
                else if(rows[0].title == role || rows[0].title == "Administrator"){
                    next();
                }
                else{
                    console.log(rows);
                    res.sendStatus(401);
                    return;
                }
            })
        }
        else{
            res.sendStatus(401);                
        }
    }
}