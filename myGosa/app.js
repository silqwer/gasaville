var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');				//express-session 은 Express 프레임워크에서 세션을 관리하기 위해 필요한 미들웨어
var flash = require('connect-flash');					//휘발성 메세지를 사용하는 모듈 
var passport = require('passport');

require('./app_server/config/passport')(passport); // 내가 작성한 passport.js 에 passport 객체를 넘김

//라우터 연결
var index = require('./app_server/routes/gsv/index');
var users = require('./app_server/routes/gsv/users');
var admin = require('./app_server/routes/adm/index')(passport); // index.js 에 passport 객체를 넘기고 admin으로 라우터 모듈을 받아옴


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express-session module
app.use(session({
	secret: '!@#$tekville!@#', 	//필수 세션은 기본적으로 식별자를 쿠키에 저장하게 되는데 그 저장되는 데이터를 암호화 하기 위한 옵션
	resave: true,				//요청이  왔을 때 세션을 수정하지 않더라도 세션을 다시 저장소에 저장
	saveUninitialized: true	    //초기화 되지 않은 세션을 강제로 저장, 모든 방문자들에게 고유한 식별 값을 주는 것과 같다. 
}));

app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

app.use(flash());

//호출할 URL과 라우터 매핑, 라우터분리
// /users, 사용자 페이지 라우터 담당 
// /admin, 관리자 페이지 라우터 담당 
app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
