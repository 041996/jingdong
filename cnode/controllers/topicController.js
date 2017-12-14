// 加载分类模型
var cateModel = require('../models/cateModel');

// 加载话题模型
var topicModel = require('../models/topicModel');

// 加载回复模型
var replyModel = require('../models/replyModel');

// 加载对应的模型
var userModel = require('../models/userModel');

// 加载eventProxy
var eventproxy = require('eventproxy');
var ep = new eventproxy();

// 加载格式化时间戳
var moment = require('moment');



// 定义topic对象
var topic = {};


// 创建话题路由
topic.create = function(req,res){
    // res.send('这是发表话题的页面');
    
    // 查询分类
    cateModel.find(function(err,cateData){
        res.render('home/create',{cateData:cateData});
    }) 
}

// 处理添加的数据
topic.doCreate = function(req,res){
    // 获取信息
    // console.log(req.params.id);
    var ri = /法轮功|傻逼|李洪志|包小姐|枪支|迷药/g;
    var str = req.body.tContent.trim();
    str = str.replace(ri,function(res){
        // res 拿到的是匹配的结果
        switch(res){
            case '法轮功':
                return '***';
            break;
            case '包小姐':
                return '***';
            break;
            case '李洪志':
                return '***';
            break;
            case '枪支':
                return '**';
            break;
            case '傻逼':
                return '**';
            break;
            case '迷药':
                return '**';
            break;
        }
    });

    var strt = req.body.tName.trim();
    strt = strt.replace(ri,function(res){
    // res 拿到的是匹配的结果
        switch(res){
            case '法轮功':
                return '***';
            break;
            case '包小姐':
                return '***';
            break;
            case '李洪志':
                return '***';
            break;
            case '枪支':
                return '**';
            break;
            case '傻逼':
                return '**';
            break;
            case '迷药':
                return '**';
            break;
        }
    });

    // 数据
    var data = {
        tName:strt,
        tContent:str,
        cid:req.body.cid,

        // 作者信息 -- 当前登录的用户的_id
        user:req.session.user._id,
        lastEdit:new Date(),
        isBuy:req.body.isBuy 
    };
    // console.log(data);
    // return;
    
    /*
        对数据库进行的是插入操作
            result 返回插入的新数据

        对数据库进行的是更新、删除
            result 返回的ok,匹配的行数
    */

    // 创建数据
    topicModel.create(data,function(err,result){
        if(err){
            // 返回错误信息
            req.flash('errMsg','数据有误,请重新尝试');

            // 跳转返回
            res.redirect('back');
            return;
        }else{
            // console.log(result);
            
            // 发表成功--直接跳转到显示话题详情页面
            res.redirect('/topic/'+result._id);
        }
    })

     var con = {
       _id:req.session.user._id
    }

    // console.log(con);
    userModel.update(con,{$inc:{gold:2}},function(err){
        console.log(err);
    })
}

// 显示当前话题详情的数据
topic.details = function(req,res){

    // 条件
    var con = {
        _id:req.params.id
    };

    //进来的时候就应该更新该话题的访问数量 -- 在原有的访问数量上+1 
    topicModel.update(con,{$inc:{visitNum:1}},function(err){
        console.log(err);
    })

    // 使用req.params接收路由 
    ep.all('topicData','replyData','userData','noData','uData',function(topicData,replyData,userData,noData,uData){
        var data = {
            topicData:topicData,
            replyData:replyData,
            userData:userData,
            noData:noData,
            uData:uData
        }
        res.render('home/details',data);
        console.log(topicData.user)
        console.log(uData);
        console.log(uData._id);
    })

    var show = '';
    // console.log(con);
    //关联查询  去topicModel查询对应的话题的详情 -- 关联查询用户的信息/关联查询该话题所属的分类
    topicModel.findOne(con).populate('user','uname gold des upic').populate('cid').exec(function(err,topicData){
        
        // console.log(show);
        //响应
        ep.emit('topicData',topicData);
    });

    // 查询回复的数据
    var con = {
        tid:req.params.id
    }
    // console.log(con);

    
    // 查询评论的条数
    replyModel.find(con).populate('user','uname upic').exec(function(err,replyData){
        ep.emit('replyData',replyData);
        
    })

    userModel.find().sort({gold:-1}).limit(10).exec(function(err,userData){
        //设置触发
        ep.emit('userData',userData);
    })


    topicModel.find({rid:{$size:0}}).sort({createTime:-1}).limit(5).exec(function(err,noData){
        //设置触发
        ep.emit('noData',noData);
        
    });

    var conttt = {
        _id:req.session.user
    }

    userModel.findOne(conttt).exec(function(err,uData){
        //设置触发
        ep.emit('uData',uData);
    })
    // 去topicModel查询对应的话题的详情
    // res.send('该位置是详情');
    // res.render('home/details')
}

// 回复话题
topic.reply = function(req,res){
    
   // 接受参数
   
   // console.log(data);
   
   // 根据tid查询当前用户的回复是第几楼
   var con = {_id:req.params.id};
   topicModel.findOne(con,'rid',function(err,topicData){
        // 测试长度
        // console.log(topicData.rid.length);
        var floorNum = topicData.rid.length+1;
        // console.log(req.body);
        var ri = /法轮功|傻逼|李洪志|包小姐|枪支|迷药/g;
        var str = req.body.rContent;
        str = str.replace(ri,function(res){
            // res 拿到的是匹配的结果
            switch(res){
                case '法轮功':
                return '***';
                break;
                case '包小姐':
                    return '***';
                break;
                case '李洪志':
                    return '***';
                break;
                case '枪支':
                    return '**';
                break;
                case '傻逼':
                    return '**';
                break;
                case '迷药':
                    return '**';
                break;
            }
        });

        var data = {
            tid:req.params.id,
            rContent : str,
            user:req.session.user._id,
            floorNum:floorNum
       };
        // 当前用户回复的楼层 topicData.rid.length+1
        // 插入到reply集合中
       replyModel.create(data,function(err,result){
            if(err){
                // 回复失败了
            }else{
                // result对应了产生回复的_id
                var con = {
                    _id:req.params.id
                };

                // 新数据
                var newData = {
                    $push:{
                        rid:result._id
                    }
                }
                topicModel.update(con,newData,function(err){
                    if(!err){
                        // 回复成功了
                        res.redirect('back');
                    }
                })
            }
       })

   })
    
    var con = {
       _id:req.session.user._id
    }

    // console.log(con);
    userModel.update(con,{$inc:{gold:2}},function(err){
        console.log(err);
    })
   
}

// 给回复点赞
topic.replyLike = function(req,res){
    // console.log(req.session.user);

    // 检测用户是否已经登录
    if(!req.session.user){
        // 响应数据
        res.send('nologin');
        // 终止程序
        return;
    }

    // 接收参数
    var con = {
        // 要点赞的回复的_id
        _id:req.params.id,

        // 点赞的人的_id
        likePerson:req.session.user._id

    };

    // 在bbs_reply中检测该用户是否已经点赞该话题
    replyModel.findOne(con,function(err,data){
        // 设置响应 res.send() 不能单纯的响应数字
        // res.send(200,0);
        
        // 在likePerson中如果用户已经点赞，在该数组中已经存储了该用户的_id
        // 在likePerson中如果用户没有点赞，在该数组中没有存储了该用户的_id
        // console.log(data);
        if(data){
            // 已经点赞 -- 将该用户的_id从数组中移除
            var newData = {
                $pull:{
                    likePerson:req.session.user._id
                }
            };

            // 条件
            var con = {
                _id : req.params.id
            }
            // console.log(con,newData);

            // 更新
            replyModel.update(con,newData,function(err,result){
                if (!err) {
                    res.send('-');
                };
            })
            
        }else{
            // 还没有点赞
            var newData = {
                $push:{
                    likePerson:req.session.user._id
                }
            };

            // 条件
            var con = {
                _id : req.params.id
            }

            // 更新
            replyModel.update(con,newData,function(err,result){
                if (!err) {
                    res.send('+');
                };
            })
        }
    })

}

// 收藏
topic.shoucang = function(req,res){
    // console.log(req.session.user);

    // 检测用户是否已经登录
    if(!req.session.user){
        // 响应数据
        res.send('nologin');
        // 终止程序
        return;
    }

    // 接收参数
    var con = {
        // 要点赞的回复的_id
        _id:req.params.id,

        // 点赞的人的_id
        like:req.session.user._id

    };

    //console.log(con)
    // console.log(req.params.id);
    // return;
    topicModel.findOne(con,function(err,data){
        //console.log(data);
        if(data){
            // 已经点赞 -- 将该用户的_id从数组中移除
            //console.log(eeee)
            var newData = {
                $pull:{
                    like:req.session.user._id
                }
            };

            // 条件
            var con = {
                _id : req.params.id
            }
            // console.log(con,newData);

            // 更新
           topicModel.update(con,newData,function(err){
                if (!err) {
                    res.send('meiyou');
                };
            })
            
        }else{
            // 还没有点赞
            var newData = {
                $push:{
                    like:req.session.user._id
                }
            };

            // 条件
            var con = {
                _id : req.params.id
            }
            console.log(newData);

            // 更新
            topicModel.update(con,newData,function(err){
                if (!err) {
                    res.send('you');
                };
            })

        }
    })
}

// 购买
topic.Buy = function(req,res){
    var con = {
        _id:req.session.user._id
    }

    // console.log(con);
    userModel.update(con,{$inc:{gold:-10}},function(err){
        console.log(err);
    })

    var cont = {
        _id:req.params.id
    }
    // console.log(cont);

    // 更新数据
    var newData = {$set:{isBuy:0}};

    // 更新
    topicModel.update(cont,newData,function(err){
        res.redirect('back')
    })
   
}

// 删除
topic.Delet = function(req,res){

    var cont = {
        _id:req.params.id
    };
    // console.log(cont)
    
    topicModel.findOne(cont).populate('user','uname').exec(function(err,deData){
        //设置触发
        // console.log(deData.user.uname);
        if(deData.user.uname!=req.session.user.uname){
            // console.log('');
            // 返回错误信息
            req.flash('errMsg','您只能删除自己发布的话题');
            

            // 跳转返回
            res.redirect('back');
            return;
        }else{
            var con = {
                _id:req.session.user._id
            }

            // console.log(con);
            userModel.update(con,{$inc:{gold:-10}},function(err){
                console.log(err);
            })

            
            topicModel.remove({_id:req.params.id}).exec(function(err){
                console.log(err);
            });

            replyModel.remove({tid:req.params.id}).exec(function(err){
                console.log(err);
                res.redirect('/');
            });
        }
        
    });
        
}

// 删除回复
topic.replyDelet = function(req,res){

    var cont = {
        _id:req.params.id
    };
    // console.log(cont)
    
    replyModel.findOne(cont).populate('user','uname').exec(function(err,deData){
        //设置触发
        // console.log(deData.user.uname);
        if(deData.user.uname!=req.session.user.uname){
            // console.log('');
            // 返回错误信息
            req.flash('errMsg','您只能删除自己发布的回复');
            

            // 跳转返回
            res.redirect('back');
            return;
        }else{
            var con = {
                _id:req.session.user._id
            }

            // console.log(con);
            userModel.update(con,{$inc:{gold:-5}},function(err){
                console.log(err);
            })

            replyModel.remove({_id:req.params.id}).exec(function(err){
                console.log(err);
                res.redirect('back');
            });
        }
        
    });
        
}

//将对象向外暴露
module.exports = topic;