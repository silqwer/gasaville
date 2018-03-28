var main =  require('../../models/gsv/main');

module.exports.index = (req, res) => {
	res.render('gsv/index', { 
		body : 'login' 
	});
};

module.exports.main = (req, res) => {
	main.list(function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		}

		res.render('gsv/index', {
			body : 'main',
			result: rows
		});
	});
};

module.exports.logout = (req, res) => {						
	req.logout();
	res.redirect('/');
}

// module.exports.join = function(req, res){
// 	res.render('gsv/index', { 
// 		title : 'join',
// 		contents : 'join'
// 	} );
// };