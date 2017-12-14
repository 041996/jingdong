// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var replySchema = new mongoose.Schema({
    rContent:String,
    rTime:{
        type:Date,
        default:new Date()
    },
    user:{
        type:'ObjectId',
        ref:'bbs_user'
    },
    tid:{
        type:'ObjectId',
        ref:'bbs_topic'
    },
    likePerson:[{
        type:'ObjectId',
        ref:'bbs_user'
    }],
    floorNum:{
        type:Number
    },
    // 创建时间
    createTime:{
        type:Date,
        default:Date.now
    },
    isPing:{
        type:Number,
        default:1
    }
});

// 创建模型
var replyModel = mongoose.model('bbs_reply',replySchema);

// 向外暴露
module.exports = replyModel;