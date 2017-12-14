// 路由文件 ---> 只负责路由的中转

var express = require('express');

var router = express.Router();

// 引入定义的中间件
var userCheck = require('../middlewares/userCheck');

// 加载userController控制器
var user = require('../controllers/userController');

// 用户注册的路由--->userController.js
router.get('/reg',user.reg);

// 处理用户注册的数据
router.post('/doReg',user.doReg);

// 处理邮箱激活
router.get('/doactive',user.doactive)

// 登录
router.get('/login',user.login);

// 忘记密码
router.get('/search_pass',user.search_pass);

// 处理忘记密码
router.post('/search',user.search);

// 发送验证码
router.get('/sendma/:id',user.sendma);

// 新手入门
router.get('/newst',user.newst);

// 未读消息
router.get('/noread',user.noread);

// API
router.get('/api',user.api);

// 关于
router.get('/about',user.about);

// 处理用户登录路由
router.post('/doLogin',user.doLogin);

// 退出
router.get('/logout',user.logout);

// 设置 用户个人中心 --- 用户不登录是不允许进行访问的
// 中间的userCheck.isLogin方法是中间件
router.get('/ucenter',userCheck.isLogin,user.ucenter);

// 更改个人信息
router.post('/setting',userCheck.isLogin,user.setting);

// 更改密码
router.post('/settingpwd',userCheck.isLogin,user.settingpwd);

// 申请友情社区
router.get('/apply',user.apply);

// 处理申请友情社区
router.post('/Doapply',user.Doapply);


module.exports = router;
