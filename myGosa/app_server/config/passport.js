/**
 * 참고 
 * http://bcho.tistory.com/920
 * https://github.com/manjeshpv/node-express-passport-mysql
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/adm/users');

module.exports = function(passport){
	
	//로그인이 성공하면 아래함수를 이용하여 사용자 정보를 Session에 저장 
	passport.serializeUser(function(user, done) {
		//deserializeUser의 callback함수의 첫번째 인자로 넘어오는 내용 "user"  세션에 저장된 사용자 정보이다.
		done(null, user);
	});
	
	// 인증 후 페이지 접근 시 마다 사용자의 정보를 Session에서 읽어옴
	passport.deserializeUser(function(user, done){
		//deserializeUser의 callback함수의 첫번째 인자로 넘어오는 내용 "user"  세션에 저장된 사용자 정보이다.
		done(null, user);		
	});
	                                 
	//회원가입                                        
	passport.use('local-signup', new LocalStrategy({
		usernameField:'userId', 
		passwordField:'userPw',
		passReqToCallback: true
	}, 
	
	function(req, userId, userPw, done){
		User.findById(userId, function(err, rows){
		
			if(err){
				return done(err);
			}
			
			if(rows.length){
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			}
		});
		
		//유저 생성
		var newUser = {
				ID : userId, 
				PASSWORD : userPw //암호화 과정 추가해야함 
		};
		
		User.insert(newUser, function(err, rows){
			newUser.SEQ = rows.insertId; 
			return done(null, newUser);
		});
		
	}));
	
	// 로그인
	passport.use('local-login', new LocalStrategy({
		usernameField:'userId', 
		passwordField:'userPw',
		passReqToCallback: true
	},
	
	function(req, userId, userPw, done){
		User.findById(userId, function(err, rows){
		
			if(err){
				return done(err);
			}
			
			if(!rows.length){
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			}
			
			if(rows[0].PASSWORD !== userPw){
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			}
			
			return done(null, rows[0]);
		});
	}));
};