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

// 引入上传头像
var upload = require('../config/upload_config');

// 加载头像处理模块
var gm = require('gm');

// 友情链接
var applyModel = require('../models/applyModel');



// 设置空对象
var admin = {};

// 后台首页
admin.index = function(req,res){
    // userModel.find
    res.render('admin/index');
}


// 处理退出的方法
admin.userLogout = function(req,res){
    req.session.user = null;
    res.redirect('/');
}

// 展示所有的用户
admin.userShow = function(req,res){
    // 计算总数量
    userModel.find().count(function(err,total){
        // 每页显示20条
        var pageSize = 6;

        // 定义当前的页数
        var page = req.query.page?req.query.page:1;

        // 页数的最大值
        var pageMax = Math.ceil(total/pageSize);

        // 得到偏移量
        var pageOffset = (page-1)*pageSize;

        // 查询所有的用户
        userModel.find().sort({createTime:-1}).skip(pageOffset).limit(pageSize).exec(function(err,userData){
            // console.log(userData);
            // 查询所有的用户数据

            var data = {
                userData:userData,
                page : page,
                pageMax : pageMax
            }

            res.render('admin/user/userShow',data);
        })
    })
};

// 添加用户
admin.userAdd = function(req,res){
    res.render('admin/user/userAdd');
}

// 处理添加用户
admin.userDoadd = function(req,res){
    // 判断是否上传了头像
    upload(req,res,function(err){
        // 如果code的值是 LIMIT_FILE_SIZE 说明文件太大了
        // 如果code的值是 fileType，说明文件类型不符合

        // 使用switch结构对应错误信息
        if(err){
            switch(err.code){
                case 'LIMIT_FILE_SIZE':
                    var errMsg = '文件太大了....'
                break;
                case 'fileType':
                    var errMsg = '文件类型错误....';
                break;
            }   

            // 返回对应的错误信息 -- 跳转会上传文件的页面 -- 一次性
            // 模块 connect-flash
            req.flash('errMsg',errMsg)
            res.redirect('back');
        }else{
            if(req.file){
                // 成功的....
                // 获取上传的文件名;
                var filename = req.file.filename;
                // console.log(req.file.path);
                // 缩放图片 -- 文件上传完毕存储的位置req.file.path
                gm(req.file.path).resize(120,120).write(req.file.path,function(err,msg){
                    // console.log(err);
                     console.log(msg);
               }); 
                // console.log(req.file);

                // 接收数据 ---> 插入到数据库
             
                // 获取表单以post方式提交的数据
                var uname = req.body.uname.trim();
                var email = req.body.email.trim();

                // 检测用户是否已存在...
                var con = {$or:[{uname:uname},{email:email}]}
                // console.log(con)

                // 查询
                userModel.findOne(con,function(err,data){
                    // console.log(data);
                    if(err){
                        console.log(err);

                        //终止
                        return;
                    }

                    // data不存在说明可以注册，存在就不可以注册
                    if(data){
                        // 返回错误信息
                        req.flash('errMsg','用户名或邮箱已存在...');
                        // console.log('meiyou');
                        // 跳转
                        res.redirect('back');
                        // 终止程序
                        return;
                    }else{
                        var reg = /\d+\.\d+\.\d+\.\d+/;

                        // 获取用户IP地址
                        var ip =req.ip.match(reg)[0];
                        var userDate = {
                            uname:uname,
                            gold:req.body.gold,
                            level:req.body.level,
                            sex:req.body.sex,
                            age:req.body.age,
                            email:email,
                            regip:ip,
                            lastLogin:new Date(),
                            phone:req.body.phone,
                            upic:filename,
                            upwd:crypto('123456')
                        }
                        // console.log(userDate);
                        // 添加数据
                        userModel.create(userDate,function(err){
                            if(err){
                                // 说明有错误
                                req.flash('errMsg','数据异常，请重新尝试....');

                                // 跳转
                                res.redirect('back');

                                //终止
                                return;
                            }       
                                // 成功了...
                                res.redirect('/admin/userShow');
                                // 两个选择：跳转首页、跳转到登录页面
                        })
                        
                    }
                })
            }else{
                // console.log(req.body);
                // 接收数据 ---> 插入到数据库
             
                // 获取表单以post方式提交的数据
                var uname = req.body.uname.trim();
                var email = req.body.email.trim();

                // 检测用户是否已存在...
                var con = {$or:[{uname:uname},{email:email}]}
                // console.log(con)

                // 查询
                userModel.findOne(con,function(err,data){
                    // console.log(data);
                    if(err){
                        console.log(err);

                        //终止
                        return;
                    }

                    // data不存在说明可以注册，存在就不可以注册
                    if(data){
                        // 返回错误信息
                        req.flash('errMsg','用户名或邮箱已存在...');
                        // console.log('meiyou');

                        // 跳转
                        res.redirect('back');
                        // 终止程序
                        return;
                    }else{
                        var reg = /\d+\.\d+\.\d+\.\d+/;

                        // 获取用户IP地址
                        var ip =req.ip.match(reg)[0];
                        var userDate = {
                            uname:uname,
                            gold:req.body.gold,
                            level:req.body.level,
                            sex:req.body.sex,
                            age:req.body.age,
                            email:email,
                            regip:ip,
                            lastLogin:new Date(),
                            phone:req.body.phone,
                            upwd:crypto('123456')
                        }
                        // console.log(userDate);
                        // 添加数据
                        userModel.create(userDate,function(err){
                            if(err){
                                // 说明有错误
                                req.flash('errMsg','数据异常，请重新尝试....');

                                // 跳转
                                res.redirect('back');

                                //终止
                                return;
                            }       
                                // 成功了...
                                res.redirect('/admin/userShow');
                        })
                        
                    }
                })
            }           
        }
    })
}

// 修改个人信息页面
admin.userEdit = function(req,res){
    // 将当前用户数据响应到页面
    var con = {
        _id : req.query._id
    };
    // console.log(con)

    // 修改用户的权限、金币

    // 查询
    userModel.findOne(con,function(err,user){
        // 响应页
        res.render('admin/user/userEdit.ejs',{user:user});
    })
}

// 处理修改个人信息
admin.userDoedit = function(req,res){
    // 判断是否上传了头像
    upload(req,res,function(err){
        // 获取用户的数据
        var con = {
            _id : req.body._id
        }
        // console.log(req.body._id);
        
        // return;
        // 如果code的值是 LIMIT_FILE_SIZE 说明文件太大了
        // 如果code的值是 fileType，说明文件类型不符合

        // 使用switch结构对应错误信息
        if(err){
            switch(err.code){
                case 'LIMIT_FILE_SIZE':
                    var errMsg = '文件太大了....'
                break;
                case 'fileType':
                    var errMsg = '文件类型错误....';
                break;
            }   

            // 返回对应的错误信息 -- 跳转会上传文件的页面 -- 一次性
            // 模块 connect-flash
            req.flash('errMsg',errMsg)
            res.redirect('back');
        }else{
            if(req.file){
                // 成功的....
                // 获取上传的文件名;
                var filename = req.file.filename;
                // console.log(req.file.path);
                // 缩放图片 -- 文件上传完毕存储的位置req.file.path
                gm(req.file.path).resize(120,120).write(req.file.path,function(err,msg){
                    // console.log(err);
                     console.log(msg);
               }); 
                // console.log(req.file);
            
                // 将文件名存储到数据库
                // 提交的信息
                var data = req.body;
                data.upic = filename;

                // console.log(data);
                userModel.update(con,{$set:data},function(err){
                    if(err){
                        // 设置失败
                        req.flash('errMsg','数据异常，请重新尝试....');

                        // 跳转回设置页面
                        res.redirect('back');
                        
                        return;
                    }else{

                            // 成功之后也返回到设置页面
                            res.redirect('/admin/userShow');

                       
                        req.flash('sucMsg','信息更新成功....');
                    }
                })
            }else{
                var data = req.body;

                // console.log(data);
                userModel.update(con,{$set:data},function(err){
                    if(err){
                        // 设置失败
                        req.flash('errMsg','数据异常，请重新尝试....');

                        // 跳转回设置页面
                        res.redirect('back');
                        
                        return;
                    }else{

                            // 成功之后也返回到设置页面
                            res.redirect('/admin/userShow');

                        req.flash('sucMsg','信息更新成功....');
                    }
                })
            }        
            
        }
    })  

}

// // 更新用户数据
// admin.userUpdate = function(req,res){}

// 用户禁用
admin.userStop = function(req,res){
    // 
    var con = {
        _id : req.query._id
    }

    // 更新数据
    var newData = {$set:{isAllow:0}};

    // 更新
    userModel.update(con,newData,function(err){
        res.redirect('back')
    });

    // 前台用户登录时，一定要判定是否已经被禁止了
}

// 启用
admin.userStart = function(req,res){
    var con = {
        _id : req.query._id
    }

    // 更新数据
    var newData = {$set:{isAllow:1}};

    // 更新
    userModel.update(con,newData,function(err){
        res.redirect('back')
    })
}

// 显示话题分类
admin.cateShow = function(req,res){


    cateModel.find().sort({createTime:-1}).exec(function(err,cateData){
        //设置触发
         var data = {
            cateData:cateData
        }
        res.render('admin/cate/cateShow',data);
        
    });



   
    // res.send('显示话题分类页面');
}
// 修改话题信息
admin.cateEdit = function(req,res){
    // 将当前用户数据响应到页面
    var con = {
        _id : req.query._id
    };
    // console.log(con)
    cateModel.findOne(con).exec(function(err,cate){
        
        // console.log(show);
        //响应
        res.render('admin/cate/cateEdit',{cate:cate});
    });
}

// 处理修改话题分类
admin.cateDoedit = function(req,res){
        // 获取用户的数据
        var con = {
            _id : req.body._id
        }
        // console.log(req.body._id);
    
        var data = {
            cateName:req.body.cateName
        }

        // console.log(data);
        cateModel.update(con,{$set:data},function(err){
            if(err){
                // 设置失败
                req.flash('errMsg','数据异常，请重新尝试....');

                // 跳转回设置页面
                res.redirect('back');
                
                return;
            }else{

                    // 成功之后也返回到设置页面
                    res.redirect('/admin/cateShow');

                req.flash('sucMsg','信息更新成功....');
            }
        })
}

// 添加话题分类
admin.cateAdd = function(req,res){
    res.render('admin/cate/cateAdd');
    // res.send('添加话题分类页面');
}

// 处理添加话题分类
admin.cateDoadd = function(req,res){
    // console.log(req.body);
    // return;
    var data = {
        cateName:req.body.cateName
    }
    // console.log(data);
    cateModel.create(data,function(err){
        // console.log(err);
        if(err){
            // 说明有错误
            req.flash('errMsg','数据异常，请重新尝试....');

            // 跳转
            res.redirect('back');

            //终止
            return;
        }       
            // 成功了...
            res.redirect('/admin/cateShow');
    })
}

// 删除话题分类
admin.cateDelet = function(req,res){
    var con = {
        cid : req.query._id
    }
    // console.log(con)
    topicModel.find(con).exec(function(err,data){
        // console.log(data);
        if(data.length!=0){
            req.flash('errMsg','该分类下有话题，不允许删除....');
            res.redirect('back');
            // console.log('该分类下有话题，不允许删除....');
        }else{
            // console.log(req.query._id);
            cateModel.remove({_id:req.query._id}).exec(function(err){
                console.log(err);
            });
            req.flash('sucMsg','该分类已删除....');
            res.redirect('back');
        }
    })
}

// 显示话题
admin.topicShow = function(req,res){

    topicModel.find().count(function(err,total){
        // 每页显示20条
        var pageSize = 10;

        // 定义当前的页数
        var page = req.query.page?req.query.page:1;

        // 页数的最大值
        var pageMax = Math.ceil(total/pageSize);

        // 得到偏移量
        var pageOffset = (page-1)*pageSize;

        topicModel.find().sort({createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cid').populate('rid').exec(function(err,allData){
            //设置触发
             var data = {
                allData:allData,
                page : page,
                pageMax : pageMax
            }
           res.render('admin/topic/topicShow',data);
            
        });


    })

        
   
    // res.send('显示话题页面');
}

// 屏蔽话题
admin.topicStop = function(req,res){
    // 
    var con = {
        _id : req.query._id
    }
    // console.log(con);

    // 更新数据
    var newData = {$set:{isShieled:0}};

    // 更新
    topicModel.update(con,newData,function(err){
        res.redirect('back')
    });

    // 前台用户登录时，一定要判定是否已经被禁止了
}

// 显示话题
admin.topicStart = function(req,res){
    var con = {
        _id : req.query._id
    }

    // 更新数据
    var newData = {$set:{isShieled:1}};

    // 更新
    topicModel.update(con,newData,function(err){
        res.redirect('back')
    })
}

// 加精
admin.topicJing = function(req,res){
    // 
    var con = {
        _id : req.query._id
    }
    console.log(con);

    // 更新数据
    var newData = {$set:{isJing:0}};

    // 更新
    topicModel.update(con,newData,function(err){
        res.redirect('back')
    });

    // 前台用户登录时，一定要判定是否已经被禁止了
}

// 不加精
admin.topicNojing = function(req,res){
    var con = {
        _id : req.query._id
    }

    // 更新数据
    var newData = {$set:{isJing:1}};

    // 更新
    topicModel.update(con,newData,function(err){
        res.redirect('back')
    })
}

// 置顶
admin.topicTop = function(req,res){
    // 
    var con = {
        _id : req.query._id
    }
    console.log(con);

    // 更新数据
    var newData = {$set:{isTop:0}};

    // 更新
    topicModel.update(con,newData,function(err){
        res.redirect('back')
    });

    // 前台用户登录时，一定要判定是否已经被禁止了
}

// 不置顶
admin.topicNotop = function(req,res){
    var con = {
        _id : req.query._id
    }

    // 更新数据
    var newData = {$set:{isTop:1}};

    // 更新
    topicModel.update(con,newData,function(err){
        res.redirect('back')
    })
}

// 修改话题信息
admin.topicEdit = function(req,res){
    // 将当前用户数据响应到页面
    var con = {
        _id : req.query._id
    };
    // console.log(con)
   topicModel.findOne(con).populate('user','uname gold des upic').populate('cid').populate('rid').exec(function(err,topic){
        
        // console.log(show);
        //响应
        res.render('admin/topic/topicEdit',{topic:topic});
    });
}

// 处理修改话题
admin.topicDoedit = function(req,res){
        // 获取用户的数据
        var con = {
            _id : req.body._id
        }
        // console.log(req.body._id);
    
        var data = {
            tName:req.body.tName,
            tContent:req.body.tContent
        }

        // console.log(data);
        topicModel.update(con,{$set:data},function(err){
            if(err){
                // 设置失败
                req.flash('errMsg','数据异常，请重新尝试....');

                // 跳转回设置页面
                res.redirect('back');
                
                return;
            }else{

                    // 成功之后也返回到设置页面
                    res.redirect('/admin/topicShow');

                req.flash('sucMsg','信息更新成功....');
            }
        })
}

// 添加话题
admin.topicAdd = function(req,res){

    // 查询分类
    cateModel.find(function(err,cateData){
        res.render('admin/topic/topicAdd',{cateData:cateData});
    })
    // res.send('增加话题页面');
}

// 处理添加话题
admin.topicDoadd = function(req,res){
    // console.log(req.body);
    var data = {
        tName:req.body.tName,
        tContent:req.body.tContent,
        cid:req.body.cid,
        user: '58624a3fede58516a4df8843',
        lastEdit:new Date()
    }
    // console.log(data);
    topicModel.create(data,function(err){
        // console.log(err);
        if(err){
            // 说明有错误
            req.flash('errMsg','数据异常，请重新尝试....');

            // 跳转
            res.redirect('back');

            //终止
            return;
        }       
            // 成功了...
            res.redirect('/admin/topicShow');
    })
}

// 显示回复
admin.replyShow = function(req,res){
    replyModel.find().count(function(err,total){
        // 每页显示20条
        var pageSize = 10;

        // 定义当前的页数
        var page = req.query.page?req.query.page:1;

        // 页数的最大值
        var pageMax = Math.ceil(total/pageSize);

        // 得到偏移量
        var pageOffset = (page-1)*pageSize;

        replyModel.find().sort({createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('tid','tName').exec(function(err,allData){
            //设置触发
             var data = {
                allData:allData,
                page : page,
                pageMax : pageMax
            }
           res.render('admin/reply/replyShow',data);
        });


    })
    // res.send('显示回复页面');
}

// 屏蔽回复
admin.replyStop = function(req,res){
    // 
    var con = {
        _id : req.query._id
    }
    // console.log(con);

    // 更新数据
    var newData = {$set:{isPing:0}};

    // 更新
    replyModel.update(con,newData,function(err){
        res.redirect('back')
    });

    // 前台用户登录时，一定要判定是否已经被禁止了
}

// 显示回复
admin.replyStart = function(req,res){
    var con = {
        _id : req.query._id
    }

    // 更新数据
    var newData = {$set:{isPing:1}};

    // 更新
    replyModel.update(con,newData,function(err){
        res.redirect('back')
    })
}

// 修改回复信息
admin.replyEdit = function(req,res){
    // 将当前用户数据响应到页面
    var con = {
        _id : req.query._id
    };
    // console.log(con)
    replyModel.findOne(con).populate('user','uname').populate('tid','tName').exec(function(err,reply){
        
        // console.log(show);
        //响应
        res.render('admin/reply/replyEdit',{reply:reply});
    });
}

// 处理修改话题
admin.replyDoedit = function(req,res){
        // 获取用户的数据
        var con = {
            _id : req.body._id
        }
        // console.log(req.body._id);
    
        var data = {
            rContent:req.body.rContent
        }

        // console.log(data);
        // return;
        replyModel.update(con,{$set:data},function(err){
            if(err){
                // 设置失败
                req.flash('errMsg','数据异常，请重新尝试....');

                // 跳转回设置页面
                res.redirect('back');
                
                return;
            }else{

                // 成功之后也返回到设置页面
                res.redirect('/admin/replyShow');

                req.flash('sucMsg','信息更新成功....');
            }
        })
}

// 添加回复
admin.replyAdd = function(req,res){
    res.render('admin/reply/replyAdd')
    // res.send('增加回复页面');
}

// 处理添加回复
admin.replyDoadd = function(req,res){
    // console.log(req.body);

    topicModel.findOne({tName:req.body.tName}).exec(function(err,topicData){
        // console.log(topicData);
        // ep.emit('replyData',replyData);
        if(!topicData){
            req.flash('errMsg','该话题不存在，请重新尝试....');
            res.redirect('back');
            return;
        }else{
            console.log(topicData.rid);
                // 测试长度
                // console.log(topicData.rid.length);
                var floorNum = topicData.rid.length+1;
                // console.log(floorNum);
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
                    tid:topicData._id,
                    rContent : str,
                    user:'58624a3fede58516a4df8843',
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
                            _id:topicData._id
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
                                res.redirect('/admin/replyShow');
                            }
                        })
                    }
               })

           }
        
    })
}

// 显示友情链接
admin.linkShow = function(req,res){
    applyModel.find().sort({createTime:-1}).exec(function(err,applyData){
        // console.log(userData);
        // 查询所有的用户数据

        var data = {
            applyData:applyData
        }

        res.render('admin/link/linkShow',data);
    })
    // res.send('显示友情链接页面');
}

// 编辑友情链接
admin.linkEdit = function(req,res){
    // 将当前用户数据响应到页面
    var con = {
        _id : req.query._id
    };
    // console.log(con)
    applyModel.findOne(con).exec(function(err,apply){
        
        // console.log(show);
        //响应
        res.render('admin/link/linkEdit',{apply:apply});
    });
}

// 处理修改友情链接
admin.linkDoedit = function(req,res){
    // 判断是否上传了头像
    upload(req,res,function(err){
        // 获取用户的数据
        var con = {
            _id : req.body._id
        }
        // console.log(req.body._id);
        
        // return;
        // 如果code的值是 LIMIT_FILE_SIZE 说明文件太大了
        // 如果code的值是 fileType，说明文件类型不符合

        // 使用switch结构对应错误信息
        if(err){
            switch(err.code){
                case 'LIMIT_FILE_SIZE':
                    var errMsg = '文件太大了....'
                break;
                case 'fileType':
                    var errMsg = '文件类型错误....';
                break;
            }   

            // 返回对应的错误信息 -- 跳转会上传文件的页面 -- 一次性
            // 模块 connect-flash
            req.flash('errMsg',errMsg)
            res.redirect('back');
        }else{
            if(req.file){
                // 成功的....
                // 获取上传的文件名;
                var filename = req.file.filename;
                // console.log(req.file.path);
                // 缩放图片 -- 文件上传完毕存储的位置req.file.path
                gm(req.file.path).resize(120,120).write(req.file.path,function(err,msg){
                    // console.log(err);
                     console.log(msg);
               }); 
                // console.log(req.file);
            
                // 将文件名存储到数据库
                // 提交的信息
                var data = req.body;
                data.upic = filename;

                // console.log(data);
                applyModel.update(con,{$set:data},function(err){
                    if(err){
                        // 设置失败
                        req.flash('errMsg','数据异常，请重新尝试....');

                        // 跳转回设置页面
                        res.redirect('back');
                        
                        return;
                    }else{

                            // 成功之后也返回到设置页面
                            res.redirect('/admin/linkShow');

                       
                        req.flash('sucMsg','信息更新成功....');
                    }
                })
            }else{
                var data = req.body;

                // console.log(data);
                applyModel.update(con,{$set:data},function(err){
                    if(err){
                        // 设置失败
                        req.flash('errMsg','数据异常，请重新尝试....');

                        // 跳转回设置页面
                        res.redirect('back');
                        
                        return;
                    }else{

                            // 成功之后也返回到设置页面
                            res.redirect('/admin/linkShow');

                        req.flash('sucMsg','信息更新成功....');
                    }
                })
            }        
            
        }
    })  
}

// 删除友情链接
admin.linkDelet = function(req,res){
   
    applyModel.remove({_id:req.query._id}).exec(function(err){
        console.log(err);
    });
    req.flash('sucMsg','该分类已删除....');
    res.redirect('back');
}

// 是否同意友情链接
admin.linkNoaggre = function(req,res){
    var con = {
        _id : req.query._id
    }
    console.log(con)
    // 更新数据
    var newData = {$set:{isAggre:1}};

    // 更新
    applyModel.update(con,newData,function(err){
        res.redirect('back')
    })
    
}

admin.linkAggre = function(req,res){
     var con = {
        _id : req.query._id
    }
    // 更新数据
    var newData = {$set:{isAggre:0}};

    // 更新
    applyModel.update(con,newData,function(err){
        res.redirect('back')
    })
    
}

// 添加友情链接
admin.linkAdd = function(req,res){
    res.render('admin/link/linkAdd')
    // res.send('增加友情链接页面');
}

// 处理添加友情链接
admin.linkDoadd = function(req,res){
    // 判断是否上传了头像
    upload(req,res,function(err){
        // 如果code的值是 LIMIT_FILE_SIZE 说明文件太大了
        // 如果code的值是 fileType，说明文件类型不符合

        // 使用switch结构对应错误信息
        if(err){
            switch(err.code){
                case 'LIMIT_FILE_SIZE':
                    var errMsg = '文件太大了....'
                break;
                case 'fileType':
                    var errMsg = '文件类型错误....';
                break;
            }   

            // 返回对应的错误信息 -- 跳转会上传文件的页面 -- 一次性
            // 模块 connect-flash
            req.flash('errMsg',errMsg)
            res.redirect('back');
        }else{
            if(req.file){
                // 成功的....
                // 获取上传的文件名;
                var filename = req.file.filename;
                // console.log(req.file.path);
                // 缩放图片 -- 文件上传完毕存储的位置req.file.path
                gm(req.file.path).resize(120,120).write(req.file.path,function(err,msg){
                    // console.log(err);
                     console.log(msg);
               }); 
                // console.log(req.file);

                // 接收数据 ---> 插入到数据库
             
                // 获取表单以post方式提交的数据
                var wname = req.body.wname.trim();
                var email = req.body.email.trim();

                // 检测用户是否已存在...
                var con = {$or:[{wname:wname},{email:email}]}
                // console.log(con)

                // 查询
                userModel.findOne(con,function(err,data){
                    // console.log(data);
                    if(err){
                        console.log(err);

                        //终止
                        return;
                    }

                    // data不存在说明可以注册，存在就不可以注册
                    if(data){
                        // 返回错误信息
                        req.flash('errMsg','该链接已存在...');
                        // console.log('meiyou');
                        // 跳转
                        res.redirect('back');
                        // 终止程序
                        return;
                    }else{
                        var userDate = {
                            wname:wname,
                            email:email,
                            upic:filename,
                            url:req.body.url,
                            wintro:req.body.wintro
                        }
                        // console.log(userDate);
                        // 添加数据
                        applyModel.create(userDate,function(err){
                            if(err){
                                // 说明有错误
                                req.flash('errMsg','数据异常，请重新尝试....');

                                // 跳转
                                res.redirect('back');

                                //终止
                                return;
                            }       
                                // 成功了...
                                res.redirect('/admin/linkShow');
                                // 两个选择：跳转首页、跳转到登录页面
                        })
                        
                    }
                })
            }else{
                // console.log(req.body);
                // 接收数据 ---> 插入到数据库
             
                // 获取表单以post方式提交的数据
                var wname = req.body.wname.trim();
                var email = req.body.email.trim();

                // 检测用户是否已存在...
                var con = {$or:[{wname:wname},{email:email}]}
                // console.log(con)

                // 查询
                applyModel.findOne(con,function(err,data){
                    // console.log(data);
                    if(err){
                        console.log(err);

                        //终止
                        return;
                    }

                    // data不存在说明可以注册，存在就不可以注册
                    if(data){
                        // 返回错误信息
                        req.flash('errMsg','用户名或邮箱已存在...');
                        // console.log('meiyou');

                        // 跳转
                        res.redirect('back');
                        // 终止程序
                        return;
                    }else{
                        var userDate = {
                            wname:wname,
                            email:email,
                            upic:filename,
                            url:req.body.url,
                            wintro:req.body.wintro
                        }
                        // console.log(userDate);
                        // 添加数据
                        applyModel.create(userDate,function(err){
                            if(err){
                                // 说明有错误
                                req.flash('errMsg','数据异常，请重新尝试....');

                                // 跳转
                                res.redirect('back');

                                //终止
                                return;
                            }       
                                // 成功了...
                                res.redirect('/admin/linkShow');
                        })
                        
                    }
                })
            }           
        }
    })
}

// 向外暴露
module.exports = admin;