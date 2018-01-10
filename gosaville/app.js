
/**
 * Module dependencies.
 * 웹서버가 실행될때 최초로 실행되는 파일
 * express에서 권장하는 이름은 app.js 
 * 
 */

// 필요한 모듈들을 require
var express = require('express')			//웹 서버를 실행하는 역활을 하는 http 모듈
  , routes = require('./routes')			//서버 관련?
  , user = require('./routes/user')			//서버 관련? 
  , http = require('http')					//웹 서버를 실행하는 역활을 하는 http 모듈
  , path = require('path')					//경로 설정시 유용하게 해주는 path 모듈
  , mysql = require('mysql')
  , option = {
		host     : '10.10.10.24',
		user     : 'user_swprodg',
		password : 'xpzmqlf',
		port	 : 3306,
		database : 'gosa'
	};
var client = mysql.createConnection(option);
// 이건 내꺼 이걸 dev 브런치에 머지 하고 싶다. 
var app = express();						//app에 express() 모듈을 담는다. 

 

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
