var loginHelper = require('../auth/login');

module.exports.login = function(req, res){
    loginHelper.login(req, res);
}

module.exports.logout = function(req, res){
    loginHelper.logout(req);
}