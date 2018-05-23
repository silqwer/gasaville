/**
 * 데이터베이스 접속 정보
 */

module.exports = (function(){
	return {
		
		//로컬 디비
		local: {	
			host: 'localhost',
			port: '3306',
			user: 'root',
			password: '',
			database: ''
		}, 
		
		//운영 디비 
		real: {
			host: 'localhost',
			port: '3306',
			user: 'user_swprodg',
			password: 'xpzmqlf',
			database: 'gosa'
		},
		
		//개발 디비
		dev: {
			host: '10.10.10.24',
			port: '3306',
			user: 'user_swprodg',
			password: 'xpzmqlf',
			database: 'gosa'
		},
		buddhaSon: {
			host: 'localhost',
			port: '3306',
			user: 'root',
			password: '123456',
			database: 'gosaville'
		}
	};
})();
