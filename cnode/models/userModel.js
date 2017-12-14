// 对应的是bbs_users集合

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var userSchema = new mongoose.Schema({
    // 用户名
    uname:{
        type:String,
        unique:true
    },
    upic:{
        type:String,
        default:''
    },
    upwd:{
        type:String
    },
    age:{
        type:Number,
        default:1
    },
    sex:{
        type:Number,
        default:3
    },
    email:{
        type:String,
        unique:true

        // 绑定邮箱 --- 邮箱是唯一的
    },

    // 积分
    gold:{
        type:Number
    },

    //个性签名
    des:{
        type:String,
        default : ''
    },

    // 创建帐户时间
    createTime:{
        type:Date,
        default:Date.now
    },

    lastLogin:{
        type:Date
    },
    regip:{
        type:String
    },
    isActive:{
        type:Number,
        default:0
    },
    phone:{
        type:Number
    },
    topics:[
        {
            type:'ObjectId',
            ref:'bbs_topic'
        }
    ],
    // 权限
    level:{
        type:Number,
        default:0
    },

    // 用户是否被禁用 --- 用户不能在前台登录
    isAllow:{
        type:Number,
        default:1
    }
})

// 生成对应集合的模型
var userModel = mongoose.model('bbs_user',userSchema);

// 向外暴露
module.exports = userModel;