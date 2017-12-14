// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var topicSchema = new mongoose.Schema({
    tName:{
        type:String
    },
    tContent:{
        type:String
    },
    cid:{
        type:'ObjectId',
        ref:'bbs_cate'
    },

    // 发表话题的作者关联的是用户的_id
    user:{
        type:'ObjectId',

        // ref表示关联
        ref:'bbs_user'
    },

    // 创建时间
    createTime:{
        type:Date,
        default:Date.now
    },

    // 最后一次修改时间
    lastEdit:{
        type:Date
    },

    // 浏览次数
    visitNum:{
        type:Number,
        default:0
    },

    // 回复的评论的_id
    rid:[{
        type:'ObjectId',
        ref:'bbs_reply'
    }],
    // 收藏
    like:[{
        type:'ObjectId',
        ref:'bbs_user'
    }],
    // 帖子是否被屏蔽 --- 屏蔽的帖子不能在前台显示
    isShieled:{
        type:Number,
        default:1
    },
    // 是否加精
    isJing:{
        type:Number,
        default:0
    },
    // 是否置顶
    isTop:{
        type:Number,
        default:0
    },

    // 是否是购买贴
    isBuy:{
        type:Number,
        default:0
    }
});


// 创建模型
var topicModel = mongoose.model('bbs_topic',topicSchema);

// 向外暴露
module.exports = topicModel;