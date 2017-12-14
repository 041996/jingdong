// 对应的是bbs_users集合

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var applySchema = new mongoose.Schema({
    // 用户名
    wname:{
        type:String,
        unique:true
    },
    upic:{
        type:String,
        default:''
    },
    url:{
        type:String
    },
    email:{
        type:String,
        unique:true

        // 绑定邮箱 --- 邮箱是唯一的
    },
    wintro:{
        type:String
    },
    createTime:{
        type:Date,
        default:Date.now
    },
    isAggre:{
        type:Number,
        default:0
    }

    
})

// 生成对应集合的模型
var applyModel = mongoose.model('bbs_apply',applySchema);

// 向外暴露
module.exports = applyModel;