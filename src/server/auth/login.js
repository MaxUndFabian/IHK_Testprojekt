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
        con.query("SELECT u.username, u.firstname, u.lastname, role.title rolename FROM Users as u left join Roles role on (u.role_id=role.id) WHERE username = ? AND password = ?;", [username, password], function(err, rows){
            if(err){
                // db server error
                console.log(err);
                res.writeHead(500, "Internal Server error occured.", {'content-type' : 'text/plain'});
                res.end("Internal Server error occured.");
                return;
            }
            console.log(rows);
            if(!rows || !rows[0]){
                // invalid combination of username and password
                res.writeHead(401, "This combination of username/password does not exist.", {'content-type' : 'text/plain'});
                res.end("This combination of username/password does not exist.");
                return;
            }
            //success
            sess.loggedIn = true;
            sess.username = rows[0].username;
            sess.role = rows[0].rolename;
            res.json(rows[0]);
        });
    }
    else{
        //This is ugly !!!
        con.query('SELECT * FROM Users WHERE username = ?', [sess.username], function(err, rows){
            res.json({username: sess.username, rolename: sess.role, firstname: rows[0].firstname, lastname: rows[0].lastname});
        });
    }
}

module.exports.logout = function(req, res){
    req.session.destroy();
    res.sendStatus(200);
}