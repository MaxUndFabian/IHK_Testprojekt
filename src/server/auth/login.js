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

module.exports.login = function(req, res){
    var sess = req.session;
    var username = req.body.username;
    var password = req.body.password;
    console.log('somone tried to login');
    console.log(req.body);
    if(!sess.loggedIn){
        con.query("SELECT u.username, role.title rolename FROM Users as u left join Roles role on (u.role_id=role.id) WHERE username = ? AND password = ?;", [username, password], function(err, rows){
            if(err){
                // db server error
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            if(!rows || !rows[0]){
                // invalid combination of username and password
                res.json({});
                return;
            }
            //success
            sess.loggedIn = true;
            sess.username = rows[0].username;
            sess.role = rows[0].rolename;
            res.json({username: rows[0].username, role: rows[0].rolename});
        });
    }
    else{
        res.json({username: sess.username, role: sess.role});
    }
}

module.exports.logout = function(req, res){
    req.session.destroy();
    res.sendStatus(200);
}