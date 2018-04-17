/**
 * 참고 
 * http://bcho.tistory.com/920
 * https://github.com/manjeshpv/node-express-passport-mysql
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/gsv/users');
var Join = require('../models/gsv/join');
var bcrypt = require('bcrypt-nodejs');

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
				return done(null, false, {message:'Your email is already used'});
			}else{
				//암호화 
				bcrypt.hash(userPw, null, null, function(err, hash){
					
					//유저 생성
					let newUser = {
							id : userId, 
							password : hash, //암호화된 패스워드 (60 characters long)
							name : req.body.userName, 
							cellphone : req.body.phoneNumber, 
							department_seq : req.body.department, 
							position_seq : req.body.position
					};
					
					Join.insert(newUser, function(err, rows){
					
						if(err)
							throw err; 
						
						return done(null, newUser);
					});
				});
			}
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
			}else{
				bcrypt.compare(userPw, rows[0].PASSWORD, function(err, res){
					
					if(res){
						return done(null, rows[0]);
					}else{
						return done(null, false, {'message' : 'Your password is incorrect'});
					}
				});
			}
		});
	}));
};