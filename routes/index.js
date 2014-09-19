
/*
 * GET home page.
 */

exports.index = function(req, res){
	var username = req.params.username;
	res.render('index', { username: username });
};