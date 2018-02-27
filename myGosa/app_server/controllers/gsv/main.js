/**
 * http://usejsdoc.org/
 */
module.exports.index = function(req, res){
	res.render('gsv/index', { 
		body : 'login' 
	});
};

module.exports.join = function(req, res){
	res.render('gsv/index', {
		body : 'join'
	});
};

module.exports.main = function(req, res){
	res.render('gsv/index', {
		body : 'main'
	});
};

// module.exports.join = function(req, res){
// 	res.render('gsv/index', { 
// 		title : 'join',
// 		contents : 'join'
// 	} );
// };