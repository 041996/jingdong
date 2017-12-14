// index控制器

// 加载分类对应的模型
var cateModel = require('../models/cateModel');
var topicModel = require('../models/topicModel');
var userModel = require('../models/userModel');
var applyModel = require('../models/applyModel');
// 加载回复模型
var replyModel = require('../models/replyModel');

// 加载eventProxy
var eventproxy = require('eventproxy');
var ep = new eventproxy();

// 设置空对象
var index = {};

// 首页
index.index = function(req,res){

    // 将分类模块的信息分配给前台页面 --- 针对分类的模型
    
    // 默认将所有的话题查询出来 -- 分页
    
    // 解决回调嵌套问题
    
    // 设置监听
    ep.all('topicData','cateData','page','pageMax','tab','userData','noData','applyData',function(topicData,cateData,page,pageMax,tab,userData,noData,applyData){
        // 关联查询 -- 以设置user(存储是用户的_id)
        
        // 分配数据
        var data = {
            cateData:cateData,
            topicData:topicData,
            page:page,
            pageMax:pageMax,
            tab:tab,
            userData:userData,
            noData:noData,
            applyData:applyData
        }

        // 响应数据
        res.render('home/index',data);
    })

    /*
        查询话题 ---
            1.同时需要查询出发表的用户
            2.在首页显示时候，我们只需要获取的是话题的标题、浏览量、用户的头像(没有、使用用户名进行代替)
    */
   
   /*
        话题查询是有条件的：
            全部 --- 没有条件   ?tab=all
            分类                ?tab=分类的_id
            精华                ?tab=分类的_id
    */
   
   // 获取条件
   // var tab = req.query.tab;
   // console.log(tab);
   
   // 按照分类进行查询
   var con = {}

   // 如果有条件 --- 第一次进来 req.query.tab 是undefined
   // if(tab=='all'){
   //      con = {};
   // }else if(tab=='good'){
   //      con = {
   //          isJing:1
   //      }
   // }else{
   //      con.cid=req.query.tab;
   // }

   // ep.emit(con,con);
   if(req.query.tab!='all' && req.query.tab!=undefined){
        con.cid = req.query.tab

        ep.emit('tab',con.cid);
   }else{
        ep.emit('tab','all');
   }

   /*
        分页处理
    */
   
   // 每页显示的条数
   var pageSize = 30;

   // 当前的页数
   var page = req.query.page?req.query.page:1;

    topicModel.find(con).sort({createTime:-1}).populate('user','uname gold').populate('cid','cateName').count(function(err,total){
        // 获取总条数 total
        // console.log(total);
        
        // page的限制
        if(page<=1){
            page=1
        }

        // 最大页数
        var pageMax = Math.ceil(total/pageSize);

        if(page>=pageMax){
            page=pageMax
        }

        // 当前的偏移量
        var pageOffset = (page-1)*pageSize;

        //关联查询 
        topicModel.find(con).sort({isTop:-1,createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname upic').populate('cid','cateName').exec(function(err,topicData){
            //设置触发
            ep.emit('topicData',topicData);
            ep.emit('page',page);
            ep.emit('pageMax',pageMax);

        })  
        
    }) 

    // 查询所有的分类
    cateModel.find(function(err,cateData){
        // console.log(data);
        
        // 设置触发(事件名称,传递的数据)
        ep.emit('cateData',cateData);
    })

    userModel.find().sort({gold:-1}).limit(10).exec(function(err,userData){
        //设置触发
        ep.emit('userData',userData);
    })


    topicModel.find({rid:{$size:0}}).sort({createTime:-1}).limit(5).exec(function(err,noData){
        //设置触发
        ep.emit('noData',noData);
        
    });



    applyModel.find({isAggre:1}).sort({createTime:-1}).limit(4).exec(function(err,applyData){
        //设置触发
        ep.emit('applyData',applyData);
        
    });


    var cont = {
        tid:req.query._id
    }


};

//搜索
index.topicSearch = function(req,res){
    // console.log(req.query.search);
    
    // 设置监听
    ep.all('topicData','cateData','page','pageMax','tab','userData','noData','search','applyData',function(topicData,cateData,page,pageMax,tab,userData,noData,search,applyData){
        // 关联查询 -- 以设置user(存储是用户的_id)
        
        // 分配数据
        var data = {
            cateData:cateData,
            topicData:topicData,
            page:page,
            pageMax:pageMax,
            tab:tab,
            userData:userData,
            noData:noData,
            search:search,
            applyData:applyData
        }

        // 响应数据
        res.render('home/indexb',data);
    })
   
   // 获取条件
   // var tab = req.query.tab;
   // console.log(tab);
   
   // 按照分类进行查询
   var con = {tName:eval('/'+req.query.search+'/')}

   // 如果有条件 --- 第一次进来 req.query.tab 是undefined
   if(req.query.tab!='all' && req.query.tab!=undefined){
        con.cid = req.query.tab

        ep.emit('tab',con.cid);
   }else{
        ep.emit('tab','all');
   }
   
   if(req.query.search==undefined){
      search='';
      ep.emit('search',search)
   }else{
    search=req.query.search;
      ep.emit('search',search)
   }

   // 每页显示的条数
   var pageSize = 5;

   // 标志
   var search = 'search'

   // 当前的页数
   var page = req.query.page?req.query.page:1;

    topicModel.find(con).sort({createTime:-1}).populate('user','uname gold').populate('cid','cateName').count(function(err,total){
        // 获取总条数 total
        // console.log(total);
        if(total==0){
            res.redirect('/');
        }
        
        // page的限制
        if(page<=1){
            page=1
        }

        // 最大页数
        var pageMax = Math.ceil(total/pageSize);

        if(page>=pageMax){
            page=pageMax
        }

        // 当前的偏移量
        var pageOffset = (page-1)*pageSize;

        //关联查询 
        topicModel.find(con).sort({isTop:-1,createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname upic').populate('cid','cateName').exec(function(err,topicData){
            //设置触发
            ep.emit('topicData',topicData);
            ep.emit('page',page);
            ep.emit('pageMax',pageMax);
            ep.emit('search',search);

        })  
        
    }) 

    // 查询所有的分类
    cateModel.find(function(err,cateData){
        // console.log(data);
        
        // 设置触发(事件名称,传递的数据)
        ep.emit('cateData',cateData);
    })

    userModel.find().sort({gold:-1}).limit(10).exec(function(err,userData){
        //设置触发
        ep.emit('userData',userData);
    })


    topicModel.find({rid:{$size:0}}).sort({createTime:-1}).limit(5).exec(function(err,noData){
        //设置触发
        ep.emit('noData',noData);
        
    });  

    applyModel.find({isAggre:1}).sort({createTime:-1}).limit(4).exec(function(err,applyData){
        //设置触发
        ep.emit('applyData',applyData);
        
    });
}


// 向外暴露
module.exports = index;