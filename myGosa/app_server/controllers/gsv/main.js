/**
 * http://usejsdoc.org/
 */
module.exports.index = (req, res) => {
	res.render('gsv/index', { 
		body : 'login' 
	});
};

module.exports.join = (req, res) => {
	res.render('gsv/index', {
		body : 'join'
	});
};

module.exports.main = (req, res) => {
	res.render('gsv/index', {
		body : 'main'
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