var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载session
var session = require('express-session');

// 加载connect-flash
var flash = require('connect-flash');

var index = require('./routes/index');
var user = require('./routes/user');
var topic = require('./routes/topic');

// 加载
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置session存储
app.use(session({
    // 加密字符串
    secret:'zheshijiamidezifuc',
    cookie:{
        maxAge:1000*60*60*24,
        path:'/'
    }
}));

// 加载
app.use(flash());

// 设置信息
app.use(function(req,res,next){
    // 全局对象
    res.locals.errMsg = req.flash('errMsg');
    res.locals.user = req.session.user;
    res.locals.errMsgt = req.flash('errMsgt');
    res.locals.suMsg = req.flash('suMsg');
    res.locals.sucMsg = req.flash('sucMsg');
    res.locals.succMsg = req.flash('succMsg');

    // 继续
    next();
})

// 首页
app.use('/', index);

// 用户模块
app.use('/user', user);

// 话题模块
app.use('/topic',topic);

// 后台模块 --- 用户必须是管理员并且登录了
app.use('/admin',function(req,res,next){
  // 如果用户没有登录，跳转到前台首页
  if(!req.session.user){
      res.redirect('/');

      // 终止程序执行
      return;
  }else if(req.session.user.level!=1){
   // 但是用户的权限不是管理员 -- 跳转前台
   res.redirect('/');

   // 终止程序执行
   return;
  }

  // 下一个
  next();
},admin);

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
