var express = require('express');
var router = express.Router();

// topic控制器
var topic = require('../controllers/topicController');

// 引入中间件，判断用户是否登录
var userCheck = require('../middlewares/userCheck');

// 对于话题的创建用户必须是登录的

// 发表话题的界面
router.get('/create',userCheck.isLogin,topic.create);

// 处理发表的话题内容
router.post('/create',userCheck.isLogin,topic.doCreate);

// 读取该话题的信息 :id 位置相当于占位符
router.get('/:id',topic.details);

// 回复话题 -- 回复集合(评论集合)
router.post('/reply/:id',userCheck.isLogin,topic.reply);

// 给回复点赞
router.get('/reply/like/:id',userCheck.isLogin,topic.replyLike);

// 收藏
router.get('/shoucang/:id',topic.shoucang);

// 购买
router.get('/Buy/:id',userCheck.isLogin,topic.Buy);

// 删除
router.get('/Delet/:id',userCheck.isLogin,topic.Delet);

// 删除回复
router.get('/replyDelet/:id',userCheck.isLogin,topic.replyDelet);

module.exports = router;