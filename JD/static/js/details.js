$(function(){
    //放大镜

    $('#showtupian').mouseover(function(){
        $('#xianshismall').show();
        $('#xianshibigPic').show();
    }).mouseout(function(){
         $('#xianshismall').hide();
        $('#xianshibigPic').hide();
    }); 
    $('#showtupian').mousemove(function(e){
         var x = e.pageX;
         var y = e.pageY;
        var newLeft = x - $(this).offset().left - $('#xianshismall').width()/2;
        if(newLeft<=0){
            newLeft = 0;
        }
        if(newLeft>($('#showtupian').width()-$('#xianshismall').width())){
            newLeft = $('#showtupian').width()-$('#xianshismall').width();
        }
        var newTop = y - $('#showtupian').offset().top - $('#xianshismall').height()/2;
        if(newTop<0){
            newTop = 0;
        }

        if(newTop>($('#showtupian').height()-$('#xianshismall').height())){
            newTop = $('#showtupian').height()-$('#xianshismall').height();
        }
        $('#xianshismall').css({left:newLeft,top:newTop,cursor:'move'});
        var bigLeft = newLeft*$('#datubig').width()/$('#showtupian').width();
        var bigTop = newTop*$('#datubig').height()/$('#showtupian').height();
         $('#datubig').css({left:-bigLeft,top:-bigTop});
    });
    $('#imglist img').click(function(){
        $('#showtupian>img:eq(0)').attr('src',$(this).attr('src'));
        $('#datubig').attr('src',$(this).attr('src'));
    });
    // 下方小图
    // console.log($('.main_left_spic li'));
    $('.main_left_spic li').click(function(){
        $('.main_left_spic li').css({"border-color":"#fff"});
        $(this).css({"border-color":"red"});
        $('.main_right_three_pic').css({"border-color":"#DADADA"});
        $('.main_right_three_pic').eq($(this).index()).css({"border-color":"red"});
    }); 

    // 右侧点击边框变色及左侧换图
    // console.log($('.main_right_three_pic'));
    $('.main_right_three_pic').click(function(){
         $('.main_right_three_pic').css({"border-color":"#DADADA"});
        $(this).css({"border-color":"red"});
        // console.log($(this).children().children().attr('src'));
        $('#showtupian>img:eq(0)').attr('src',$(this).children().children().attr('src'));
        $('#datubig').attr('src',$(this).children().children().attr('src'));

         $('.main_left_spic li').css({"border-color":"#fff"});
         $('.main_left_spic li').eq($(this).index()-1).css({"border-color":"red"});

    })

    // 右侧型号选择
    $('.neicun').click(function(){
        $('.neicun').css({'border-color':'#DADADA'});
        $(this).css({'border-color':'red'});
        // console.log($(this).text());
        var x = $(this).text();
        $('.goods_details_des span:last').html('版本 :'+x);
    })


    // 底部商品详情框框
    //console.log($('.main_two'));
    $('.goods_details ul li').click(function(){
        $('.goods_details ul li').css({background:'#f8f8f8'});
        $('.goods_details ul li a').css({color:'#7c7c7c'});
        $(this).css({background:'#34383b'});
        $(this).children().css({color:'#fff'});
        $('.main_two').hide();
        $('.main_two').eq($(this).index()).show();
    });


    // 好评中评差评
    // 添加单击事件
    $('.pingjia').click(function(){
        $('.pingjia').css({background:'#F7F7F7'});
        $(this).css({background:'#eee'});
        // console.log(1111);
        var id = $(this).attr('id');
        // 定义传递的参数 -- json格式的对象
        var params = {id:id};
        $.get('./data.php',params,function(data){
            // console.log(data);
            var str = '';

            // 遍历数据
            // console.log($(data));
            $(data).each(function(index,value){
                // console.log(value);
                str += '<li>'+value+'</li>';
             });

            // 设置html的内容
            $('#content').html(str);
         },'json') 
     });

    // 底部商品框框固定
    // console.log($('.goods_details'));
    var goodsTop = $('.goods_details').offset().top;
    var goodsHeight = $('.goods_details').height();
    // console.log(goodsTop);
     var youcemenutop = $('#youcemenu').offset().top;
    $(window).scroll(function(){
        if(goodsTop<=$(window).scrollTop()){
            $('.goods_details').css({position:'fixed',top:'0px',left:'70px'});
        }else{
            $('.goods_details').css({position:'relative',left:'0px'});
        }
        //右侧
        var scrollTop = $(window).scrollTop();
        var newyoumenuTop = scrollTop + youcemenutop;
        // console.log(newyoumenuTop);
        $('#youcemenu').offset({top:newyoumenuTop});
    })
    $(window).click(function(){
        if(goodsTop<=$(window).scrollTop()){
            $(window).scrollTop(goodsTop-3);
        }
    })

    //右侧加号与价钱
    // console.log($('.number_sec b').html());
    // console.log($('.main_right_two p').html());
    var i=$('.number_sec b').html();
    $('.number_fou').click(function(){
        i++;
        $('.number_sec b').html(i);
        $('.main_right_two p').html('￥'+2788*i+'.00');
        $('.goods_details p').html('￥'+2788*i+'.00');
    })
    $('.number_first').click(function(){
        i--;
        if(i<=1){
            i=1;
        }
        $('.number_sec b').html(i);
        $('.main_right_two p').html('￥'+2788*i+'.00');
        $('.goods_details p').html('￥'+2788*i+'.00');
    })

    // 右侧菜单
    $('#youcemenu a').mouseover(function(){
        $(this).next().css({'width':'70px','transition':'width 1s ease','background':'#CA1623'});
        $(this).parent().css({'background':'#CA1623'});
    }).mouseout(function(){
        $(this).next().css({'width':'0px','transition':'width 1s ease','background':'#7A6E6E'});
        $(this).parent().css({'background':'#7A6E6E'});
    });

    // 回到顶部
    $('.backtop').click(function(){
        $(window).scrollTop(0);
    })

})
    