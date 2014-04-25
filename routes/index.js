
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.sendfile("views/index.html");
};

exports.googleAuthFinished = function(req, res){
	res.sendfile("views/googleAuthFinished.html");
}

exports.saveToGoogle = function(req, res){
	res.sendfile("views/saveToGoogle.html");
}

exports.chat = function(req, res) {
	res.sendfile("views/chat.html");
}

exports.game24 = function(req, res) {
	res.sendfile("views/24.html");
}