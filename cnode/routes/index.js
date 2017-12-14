var express = require('express');
var router = express.Router();

// index控制器
var index = require('../controllers/indexController');

// 首页
router.get('/',index.index);

router.get('/topicSearch',index.topicSearch);

module.exports = router;
