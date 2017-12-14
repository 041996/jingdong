// 专门针对user用户的控制器

// 引入定义的中间件
var crypto = require('../middlewares/crypto');


// 加载对应的模型
var userModel = require('../models/userModel');
var cateModel = require('../models/cateModel');
var topicModel = require('../models/topicModel');
var applyModel = require('../models/applyModel');

// 加载邮箱验证
var sendemail = require('../middlewares/sendmail');

// 加载验证码
var message = require('../models/message');

// 引入上传头像
var upload = require('../config/upload_config');

// 加载头像处理模块
var gm = require('gm');

var mongodb = require('mongodb');

// 加载格式化时间戳
var moment = require('moment');

// 加载eventProxy
var eventproxy = require('eventproxy');
var ep = new eventproxy();

// 定义user对象
var user = {};

// 定义方法
user.reg = function(req,res){
    // 响应注册的模板
    // res.send('这是注册页面');
    res.render('home/reg');
}

// 用户注册的方法
user.doReg = function(req,res){
    // 接收数据 ---> 插入到数据库
    
    // console.log(userModel);
    
    // 获取表单以post方式提交的数据
    // console.log(req.body);
    var uname = req.body.uname.trim();
    var upwd = req.body.upwd.trim();
    var reupwd = req.body.reupwd.trim();
    var email = req.body.email.trim();
    var phone = req.body.phone.trim();
    // console.log(email);
    // console.log(phone);


    // 检测两次密码输入是否一致
    if(upwd!=reupwd){
        // 设置错误信息
        req.flash('errMsg','两次密码不一致');

        // 跳回注册页面
        res.redirect('/user/reg');

        // 终止程序
        return;
    }

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

            // 跳转
            res.redirect('/user/reg');

            // 终止程序
            return;
        }else{
            // 匹配IP地址的正则
            var reg = /\d+\.\d+\.\d+\.\d+/;

            // 获取用户IP地址
            var ip =req.ip.match(reg)[0];

            var userDate = {
                uname:uname,
                upwd:crypto(upwd),
                regip:ip,

                // 用户第一次注册时，最后一次登录时间为注册时间
                lastLogin:new Date(),
                gold:20,
                email:email,
                phone:phone
            }

            // console.log(userDate);


            // 添加数据
            userModel.create(userDate,function(err){
                if(err){
                    // 说明有错误
                    req.flash('errMsg','数据异常，请重新尝试....');

                    // 跳转
                    res.redirect('/user/reg');

                    //终止
                    return;
                }else{

                    userModel.findOne(con,function(err,data){
                        if(err){
                            console.log(err);
                            return;
                        }else{
                            // console.log(data._id);
                            var _id = data._id;
                            sendemail(email,uname,_id);
                        }
                    })        
                    // 成功了...
                    res.redirect('/user/login');


                    // 两个选择：跳转首页、跳转到登录页面
                }
            })
        }
    })
}

// 邮箱激活
user.doactive = function(req,res){
    // 条件
    // console.log(req.query._id);
    var con = {
        // 需要的是一个ObjectId() // req.query._id 单纯的字符串
        _id:mongodb.ObjectId(req.query._id)
    };
    // 改变激活状态条件
    var is = {
        isActive:1
    }
    userModel.update(con,{$set:is},function(err){
        if(err){
            //有错误
            req.flash('errMsg','数据异常,请重新尝试');
            res.redirect('/user/reg');
            return;
        }
        req.flash('succMsg','邮箱验证成功，赶紧登陆吧...');
        res.render('home/login',{title:'欢迎登录'});
    });
}

// 定义登录的方法
user.login = function(req,res){
    
    res.render('home/login');
    //res.send('登陆页')
};


// 处理用户登录数据
user.doLogin = function(req,res){
    // 获取数据

    // 要加密的字符串
    var mi = req.body.upwd.trim();

    var con={
        uname:req.body.uname.trim(),
        upwd:crypto(mi)
    }
    
    // var con = req.body;
    // console.log(con);
    
    // 验证是否存在
    userModel.findOne(con,function(err,data){
        // console.log(data);

        if(!data){
            // 设置错误信息，跳转回登录页面
            req.flash('errMsg','账户或密码有误...');
            res.redirect('/user/login');
            // 终止程序
            return;
        }else if(data.isAllow==0){
            req.flash('errMsg','您的账号被禁用，请联系管理员...');
            res.redirect('/user/login');
            return;
        }else{
            if(data.isActive==0){
                // 设置错误信息，跳转回登录页面
                req.flash('errMsg','还未进行邮箱验证，请先验证...');
                res.redirect('/user/login');
                uname = data.uname;
                _id = data._id;
                email = data.email;
                // console.log(email);
                sendemail(email,uname,_id);
                // 终止程序
                return;
            }

            // console.log(data)

            // 向下将data数据存储到session中
            req.session.user = data;


            var lasttime = moment(data.lastLogin).format('YYYYMMDD');
            var newtime =  new Date();

            var ttime = moment(newtime).format('YYYYMMDD');
            // console.log(lasttime);
            // console.log(ttime);

            if(ttime-lasttime>=1){
                // 获取用户的数据
                var con = {
                    uname:req.body.uname
                }

                // console.log(data);
                userModel.update(con,{$inc:{gold:20}},function(err){
                    console.log(err);
                })
            }
            userModel.update(con,{$set:{lastLogin:newtime}},function(err){
                console.log(err);
            })


            // 跳转
            res.redirect('/');
        }
       
    })
}

// 处理忘记密码的方法
user.search_pass = function(req,res){
    res.render('home/search_pass');
}

// 忘记密码
user.search = function(req,res){
    var uname = req.body.uname.trim();
    var phone = req.body.phone;
    var upwd = req.body.new_pwd.trim();
    var reupwd = req.body.req_pwd.trim();
    var ma = req.body.ma.trim();
    // console.log(phone,upwd,reupwd,ma);


    if(ma!=='123456'){
        // 设置错误信息
        req.flash('errMsgt','验证码输入错误....');

        // 跳回注册页面
        res.redirect('/user/search_pass');

        // 终止程序
        return;
    }
    // 检测两次密码输入是否一致
    if(upwd!=reupwd){
        // 设置错误信息
        req.flash('errMsgt','两次密码不一致....');

        // 跳回注册页面
        res.redirect('/user/search_pass');

        // 终止程序
        return;
    }

    var con={
        uname:uname
    }
    // console.log(old_pwd);
    // 验证是否存在
    userModel.findOne(con,function(err,data){
        if(err){
            return;
        }
        // var phone = data.phone;
        // message(phone);
        console.log(data);
        if(!data){
            // 设置错误信息，跳转回登录页面
            req.flash('errMsgt','用户不存在，请先注册...');
            res.redirect('/user/search_pass');
            // 终止程序
            return;
        }else{
            var con = {
                uname:uname
            }
            // console.log(con);
            // console.log(req.body.new_pwd)

            var data =crypto(upwd);
            // console.log(userDate);

            userModel.update(con,{$set:{upwd:data}},function(err){
                if(err){
                    // 修改密码失败
                    req.flash('errMsgt','密码修改失败，请重新尝试....');

                    // 跳转回设置页面
                    res.redirect('/user/search_pass');
                    
                    return;
                }else{
                    req.flash('suMsg','密码修改成功，请重新登录....');
                    res.redirect('/user/search_pass');            
                }
            })
        }

    })
}

// 发送验证码
user.sendma = function(req,res){
    // console.log(req.params);
    var phone = req.params.id
    // console.log(phone)
    message(phone);
    res.send('ok');
}

// 处理退出的方法
user.logout = function(req,res){
    req.session.user = null;
    res.redirect('/');
}

// 处理设置的方法
user.ucenter = function(req,res){
    // 设置监听
    ep.all('userData','noData','applyData',function(userData,noData,applyData){
        // 关联查询 -- 以设置user(存储是用户的_id)
        
        // 分配数据
        var data = {
            userData:userData,
            noData:noData,
            applyData:applyData
        }

        // 响应数据
        res.render('home/ucenter',data);
    })
    userModel.find().sort({gold:-1}).limit(10).exec(function(err,userData){
        //设置触发
        ep.emit('userData',userData);
    })


    topicModel.find({rid:{$size:0}}).sort({createTime:-1}).limit(5).exec(function(err,noData){
        //设置触发
        ep.emit('noData',noData);
        
    });

    applyModel.find().sort({createTime:-1}).limit(4).exec(function(err,applyData){
        //设置触发
        ep.emit('applyData',applyData);
        
    });

}

// 处理新手入门
user.newst = function(req,res){
    ep.all('userData','noData','applyData',function(userData,noData,applyData){
        // 关联查询 -- 以设置user(存储是用户的_id)
        
        // 分配数据
        var data = {
            userData:userData,
            noData:noData,
            applyData:applyData
        }

        // 响应数据
        res.render('home/newst',data);
    })
    userModel.find().sort({gold:-1}).limit(10).exec(function(err,userData){
        //设置触发
        ep.emit('userData',userData);
    })


    topicModel.find({rid:{$size:0}}).sort({createTime:-1}).limit(5).exec(function(err,noData){
        //设置触发
        ep.emit('noData',noData);
        
    });
    applyModel.find().sort({createTime:-1}).limit(4).exec(function(err,applyData){
        //设置触发
        ep.emit('applyData',applyData);
        
    });
    // res.render('');
}

// 处理未读消息
user.noread = function(req,res){
    ep.all('userData','noData','applyData','myData','mylikeData',function(userData,noData,applyData,myData,mylikeData){
        // 关联查询 -- 以设置user(存储是用户的_id)
        
        // 分配数据
        var data = {
            userData:userData,
            noData:noData,
            applyData:applyData,
            myData:myData,
            mylikeData:mylikeData
        }

        // console.log(myData);
        // 响应数据
        res.render('home/noread',data);
    })
    userModel.find().sort({gold:-1}).limit(10).exec(function(err,userData){
        //设置触发
        ep.emit('userData',userData);
    })


    topicModel.find({rid:{$size:0}}).sort({createTime:-1}).limit(5).exec(function(err,noData){
        //设置触发
        ep.emit('noData',noData);
        
    });
    applyModel.find().sort({createTime:-1}).limit(4).exec(function(err,applyData){
        //设置触发
        ep.emit('applyData',applyData);
        
    });
    // res.render('');
    var con = {
        user:req.query.id
    }
    // console.log(con)
    topicModel.find(con).populate('user').populate('cid').sort({createTime:-1}).exec(function(err,myData){
        //设置触发
        ep.emit('myData',myData);
        
    });

    var cont = {
        like:req.query.id
    }
    // console.log(con)
    topicModel.find(cont).populate('user').populate('cid').sort({createTime:-1}).exec(function(err,mylikeData){
        //设置触发
        ep.emit('mylikeData',mylikeData);
        
    });
}

// 处理API
user.api = function(req,res){
    res.render('home/api');
}

// 关于
user.about = function(req,res){
    ep.all('userData','noData','applyData',function(userData,noData,applyData){
        // 关联查询 -- 以设置user(存储是用户的_id)
        
        // 分配数据
        var data = {
            userData:userData,
            noData:noData,
            applyData:applyData
        }

        // 响应数据
        res.render('home/about',data);
    })
    userModel.find().sort({gold:-1}).limit(10).exec(function(err,userData){
        //设置触发
        ep.emit('userData',userData);
    })


    topicModel.find({rid:{$size:0}}).sort({createTime:-1}).limit(5).exec(function(err,noData){
        //设置触发
        ep.emit('noData',noData);
        
    });
    applyModel.find().sort({createTime:-1}).limit(4).exec(function(err,applyData){
        //设置触发
        ep.emit('applyData',applyData);
        
    });
}

// 更新个人信息
user.setting = function(req,res){
    // 获取用户的数据
    var con = {
        _id:req.session.user._id
    }

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
                        // 更新session --- 查询数据库获取最新的信息写入到session中
                        userModel.findOne(con,function(err,data){
                            req.session.user = data;

                            // 成功之后也返回到设置页面
                            res.redirect('back');

                        })
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
                        // 更新session --- 查询数据库获取最新的信息写入到session中
                        userModel.findOne(con,function(err,data){
                            req.session.user = data;

                            // 成功之后也返回到设置页面
                            res.redirect('back');

                        })
                        req.flash('sucMsg','信息更新成功....');
                    }
                })
            }
                

            

                
            
        }
    })  
}

// 更新密码
user.settingpwd = function(req,res){
    var upwd = req.body.new_pwd.trim();
    var reupwd = req.body.req_pwd.trim();

    // 检测两次密码输入是否一致
    if(upwd!=reupwd){
        // 设置错误信息
        req.flash('errMsgt','两次密码不一致....');

        // 跳回注册页面
        res.redirect('/user/ucenter');

        // 终止程序
        return;
    }
    
    // 要加密的字符串
    var mi = req.body.old_pwd.trim();

    var con={
        _id:req.session.user._id,
        upwd:crypto(mi)
    }
    // console.log(old_pwd);
    // 验证是否存在
    userModel.findOne(con,function(err,data){
        if(err){
            return;
        }
        // console.log(data);
        if(!data){
            // 设置错误信息，跳转回登录页面
            req.flash('errMsgt','原密码输入有误，请重新输入...');
            res.redirect('/user/ucenter');
            // 终止程序
            return;
        }else{
            var con = {
                _id:req.session.user._id
            }
            // console.log(con);
            // console.log(req.body.new_pwd)

            var data =crypto(upwd);
            // console.log(userDate);

            userModel.update(con,{$set:{upwd:data}},function(err){
                if(err){
                    // 修改密码失败
                    req.flash('errMsgt','密码修改失败，请重新尝试....');

                    // 跳转回设置页面
                    res.redirect('/user/ucenter');
                    
                    return;
                }else{
                    req.flash('suMsg','密码修改成功，请重新登录....');
                    res.redirect('/user/ucenter');            
                }
            })
        }

    })
}

// 申请友情社区
user.apply = function(req,res){
    res.render('home/apply');
}

// 处理申请友情社区
user.Doapply = function(req,res){
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
                // console.log(req.body)
                
             
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
                        req.flash('errMsg','已申请过，请等待管理员的验证...');
                        // console.log('meiyou');
                        // 跳转
                        res.redirect('back');
                        // 终止程序
                        return;
                    }else{
                        var userDate = {
                            wname:wname,
                            email:email,
                            url:req.body.url.trim(),
                            wintro:req.body.wintro,
                            upic:filename
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
                                 req.flash('succMsg','申请已提交，等待管理员的验证....');     
                                // 成功了...
                                res.redirect('back');
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
                        req.flash('errMsg','已申请过，请等待管理员的验证...');
                        // console.log('meiyou');

                        // 跳转
                        res.redirect('back');
                        // 终止程序
                        return;
                    }else{
                        
                        var userDate = {
                            wname:wname,
                            email:email,
                            url:req.body.url.trim(),
                            wintro:req.body.wintro,
                            upic:filename
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
                                 req.flash('succMsg','申请已提交，等待管理员的验证....');     
                                // 成功了...
                                res.redirect('back');
                        })
                        
                    }
                })
            }           
        }
    })

}


// 将对象暴露
module.exports = user;