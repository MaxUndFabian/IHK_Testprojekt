var mysql = require('mysql');

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pfadfinder_meinolf"
});

module.exports.create = function(req, res){
    //TODO if user login in place, read username from session cookie
    //TODO check if user is logged in, otherwise he isn't allowed to create an article.
	con.query("INSERT INTO Newsentries (title, content, user_username, tag_id) VALUES ('?', '?', '?', ?);", [req.body.title, req.body.content, req.body.username, req.body.tag_id], function(err, rows){
        if(err){}
        if(Object.keys(rows).length == 0){
            res.sendStatus(400);
        }
        res.json(rows[0]);
    });
}


module.exports.update = function(req, res){
    // for now, every field needs to be sent, otherwise it will be empty afterwards
    //TODO check if it makes sense, to only send updated fields, then it needs to be checked here
	con.query("UPDATE Newsentries SET title = '?', content = '?', tag_id = ? WHERE id = ?", [req.body.title, req.body.content, req.body.tag_id, req.body.id], function(err, rows){
        if(err){}
        if(Object.keys(rows).length == 0){
            res.sendStatus(400);
        }
        res.json(rows[0]);
    });
}


module.exports.list = function(req, res){
    //TODO proper error handling
	con.query('select n.id, n.title, n.content, n.creationDate, n.lastModifiedDate, n.user_username username, tag.title tag_name from Newsentries as n left join Tags tag on (n.tag_id=tag.id)', function(err, rows){
       if(err){}
       //res.sendStatus(200);
       res.json(rows);
       console.log(rows);
    });
}


module.exports.single = function(req, res){
	con.query('SELECT * FROM Newsentries WHERE id=' + req.params.id + '', function(err, rows){
        if(err){}
        if(Object.keys(rows).length == 0){
            res.sendStatus(404);
        }
        res.json(rows[0]);
        console.log(rows[0]);
    });
}


module.exports.delete = function(req, res){
	
}