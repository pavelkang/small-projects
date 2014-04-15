
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.sendfile("views/index.html");
};

exports.googleAuthFinished = function(req, res){
	res.sendfile("views/googleAuthFinished.html")
}