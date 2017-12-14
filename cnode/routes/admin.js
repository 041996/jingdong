var express = require('express');
var router = express.Router();

// admin控制器
var admin = require('../controllers/adminController');

// 首页
router.get('/',admin.index);

// 处理退出
router.get('/userLogout',admin.userLogout)

// 用户
router.get('/userShow',admin.userShow);

// 添加用户
router.get('/userAdd',admin.userAdd);

// 处理添加用户
router.post('/userDoadd',admin.userDoadd);

// 修改个人信息--页面
router.get('/userEdit',admin.userEdit);

// 处理修改个人信息
router.post('/userDoedit',admin.userDoedit);

// // 更新
// router.get('/userUpdate',admin.userUpdate);

// 禁止用户（拉黑、关小黑屋---用户在前台是不允许登录的）
router.get('/userStop',admin.userStop);

// 启用
router.get('/userStart',admin.userStart);

// 话题分类
router.get('/cateShow',admin.cateShow);

// 修改话题分类
router.get('/cateEdit',admin.cateEdit);

// 处理修改话题分类
router.post('/cateDoedit',admin.cateDoedit);

// 添加话题分类
router.get('/cateAdd',admin.cateAdd);

// 处理添加话题分类
router.post('/cateDoadd',admin.cateDoadd);

// 删除话题分类
router.get('/cateDelet',admin.cateDelet);

// 话题
router.get('/topicShow',admin.topicShow);

// 屏蔽帖子
router.get('/topicStop',admin.topicStop);

// 开启帖子
router.get('/topicStart',admin.topicStart);

// 置顶
router.get('/topicTop',admin.topicTop);

// 正常
router.get('/topicNotop',admin.topicNotop);

// 加精
router.get('/topicJing',admin.topicJing);

// 正常
router.get('/topicNojing',admin.topicNojing);

// 修改话题页面
router.get('/topicEdit',admin.topicEdit);

// 处理修改话题
router.post('/topicDoedit',admin.topicDoedit);

// 添加话题
router.get('/topicAdd',admin.topicAdd);

// 处理添加话题
router.post('/topicDoadd',admin.topicDoadd);

// 回复
router.get('/replyShow',admin.replyShow);

// 屏蔽回复
router.get('/replyStop',admin.replyStop);

// 开启回复
router.get('/replyStart',admin.replyStart);

// 修改回复页面
router.get('/replyEdit',admin.replyEdit);

// 处理修改回复
router.post('/replyDoedit',admin.replyDoedit);

// 添加回复
router.get('/replyAdd',admin.replyAdd);

// 处理添加回复
router.post('/replyDoadd',admin.replyDoadd);

// 链接
router.get('/linkShow',admin.linkShow);

// 编辑链接
router.get('/linkEdit',admin.linkEdit);

// 处理修改友情链接
router.post('/linkDoedit',admin.linkDoedit);

// 删除友情链接
router.get('/linkDelet',admin.linkDelet);

// 同意友情链接
router.get('/linkAggre',admin.linkAggre);

// 不同意友情链接
router.get('/linkNoaggre',admin.linkNoaggre);

// 添加链接
router.get('/linkAdd',admin.linkAdd);

// 处理添加友情链接
router.post('/linkDoadd',admin.linkDoadd);



module.exports = router;
