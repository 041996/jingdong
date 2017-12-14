$(function(){

    //轮播图
    var i = 0;
    var len = $('#menu_main_main>ul>li').length;
    var run;
    function autoRun(){

        clearInterval(run);
        run = setInterval(function(){
            $('#list_num>ul>li').eq(i).css({'background':'#3e3e3e'});
            $('#menu_main_main>ul>li').eq(i).fadeOut(1000);            
            i++;
            if (i==len-1) {
                i = 0;
            };
            $('#menu_main_main>ul>li').eq(i).fadeIn(1000);
            $('#list_num>ul>li').eq(i).css({'background':'#b61b1f'});
            
        },2000);
    }
    autoRun();
    $('#menu_main_main').mouseover(function(){
        clearInterval(run);
        $('#jian').show();
        $('#jian').css({'opacity':'0.5'});
    });
    $('#menu_main_main').mouseout(function(){
        autoRun();
        $('#jian').hide();
    });

    for(var j=0;j<len;j++){
        $('#list_num>ul>li').eq(j).mouseover(function(){
            clearInterval(run);
            $('#menu_main_main>ul>li').eq(i).fadeOut(1000);
            $('#list_num>ul>li').eq(i).css({'background':'#3e3e3e'});
            i = $(this).attr('data-num');
            $('#list_num>ul>li').eq(i).css({'background':'#b61b1f'});
            $('#menu_main_main>ul>li').eq(i).fadeIn(1000);
        })
    }
    $('#left').mouseover(function(){
        $('#left').css({'opacity':'1.5'});
    }).mouseout(function(){
        $('#left').css({'opacity':'0.5'});
    }).click(function(){
        $('#menu_main_main>ul>li').eq(i).fadeOut(1000);
        $('#list_num>ul>li').eq(i).css({'background':'#3e3e3e'});
        i--;
        if(i<0){
            i = len-2;
            
        }
        $('#menu_main_main>ul>li').eq(i).fadeIn(1000);
        $('#list_num>ul>li').eq(i).css({'background':'#b61b1f'});
            
    });

    $('#right').mouseover(function(){
        $('#right').css({'opacity':'1.5'});
    }).mouseout(function(){
        $('#right').css({'opacity':'0.5'});
    }).click(function(){
        $('#menu_main_main>ul>li').eq(i).fadeOut(1000);
        $('#list_num>ul>li').eq(i).css({'background':'#3e3e3e'});
        i++;
        if(i==len-1){
            i = 0;
           
        }
         $('#menu_main_main>ul>li').eq(i).fadeIn(1000);
        $('#list_num>ul>li').eq(i).css({'background':'#b61b1f'});
            
    });

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

    // 登录和蒙版
    $('#youcemenu>ul li').eq(0).click(function(){
        $('#lopku').show();
        $('#changemengban').show();
        getDivMiddle();
    })
    var newLeft;
    var newTop;
    // var i=0;
    function getDivMiddle(){
        var youcemenutop = $('#youcemenu').offset().top;        
        
        $(window).scroll(function(){
            //顶部滑框
            if($(window).scrollTop()>=$('.one_floor_top').eq(0).offset().top){
                $('.lun_top').eq(0).css({height:'50px','border-bottom':'2px solid red'});
            }else{
                $('.lun_top').eq(0).css({height:'0px','border-color':'#fff'});
            }

            //右侧
            var scrollTop = $(window).scrollTop();
            var newyoumenuTop = scrollTop + youcemenutop;
            // console.log(newyoumenuTop);
            $('#youcemenu').offset({top:newyoumenuTop});

            // 登录框
            newLeft = ($(window).innerWidth() - $('#lopku').width())/2;
            newTop = ($(window).innerHeight() - $('#lopku').height())/2+scrollTop;
            $('#lopku').css({left:newLeft,top:newTop});
            // 蒙版
            $('#changemengban').height(document.documentElement.clientHeight+scrollTop);

            // 左侧菜单
            if($('.one_floor_top').eq(0).offset().top<=$(window).scrollTop()){
                $('#floorlist').css({display:'block'});
            }else{
                $('#floorlist').css({display:'none'});
            }
        
            $('.one_floor_top').each(function(index,item){
                $('.one_floor_bottom').each(function(index,item){
                    //console.log($('.floors'))
                    // console.log($('.one_floor_bottom').eq(index));
                    if($('.one_floor_top').eq(index).offset().top-$('.one_floor_top').eq(index).height()*8<=$(window).scrollTop()&&$(window).scrollTop()<=$('.one_floor_bottom').eq(index).offset().top){
                        $('#floorlist>.leftlist').css({background:'#918888'});
        
                        $('#floorlist>.leftlist').eq(index).css({background:'#C81623'});
                        // console.log(index);
                    }
                })
                    
            })            
        });       
        
    }
    getDivMiddle();

     newLeft = ($(window).innerWidth() - $('#lopku').width())/2;
    newTop = ($(window).innerHeight() - $('#lopku').height())/2;
    $('#lopku').css({left:newLeft,top:newTop});

    // 登录及蒙版
    $('.none').click(function(){
        $('#lopku').hide();
        $('#changemengban').hide();
    })
    $('#lopku input').eq(0).focus(function(){
        $(this).css({'borderColor':'#488EE7'});
        $(this).prev().css({'borderColor':'#488EE7','backgroundPosition':'0px -48px'});
    }).blur(function(){
        $(this).css({'borderColor':'#ccc'});
        $(this).prev().css({'borderColor':'#ccc','backgroundPosition':'0px 0px'});
    })
    $('#lopku input').eq(1).focus(function(){
        $(this).css({'borderColor':'#488EE7'});
        $(this).prev().css({'borderColor':'#488EE7','backgroundPosition':'-48px -48px'});
    }).blur(function(){
        $(this).css({'borderColor':'#ccc'});
        $(this).prev().css({'borderColor':'#ccc','backgroundPosition':'-48px 0px'});
    })
    window.onresize = function(){
        getDivMiddle();
    }
    $('#lopku input:last').click(function(){
        if($(this).attr('checked')){
            $('.loptoptwo').css({opacity:0});
            $(this).removeAttr('checked');
        }else{
             $('.loptoptwo').css({opacity:1});
             $(this).prop('checked','checked');
             $(this).attr('checked','checked');
        }
        
    })

    //左侧楼层列表
    $('#floorlist>.leftlist').each(function(index,value){
        $('#floorlist>.leftlist').eq(index).click(function(){
            $('#floorlist>.leftlist').css({background:'#918888'});
            $('#floorlist>.leftlist').eq(index).css({background:'#C81623'});

            $('#floorlist .leftlist').click(function(){
                var i=$(this).index();
                //console.log(i);
                // 获取楼层
                if(i==12){
                    $('html,body').animate({scrollTop: '0px'}, 800);
                 }else{
                    var dTop = $('.one_floor_top').eq(i).offset().top-100;
                    //console.log(stepT);
                    $('html,body').animate({scrollTop: dTop}, 800);
                }
            })
        }).mouseover(function(){
            $('#floorlist>.leftlist').css({background:'#918888'});
            $('#floorlist>.leftlist').eq(index).css({background:'#C81623'});
        }).mouseout(function(){
            $('.one_floor_top').each(function(index,item){
                $('.one_floor_bottom').each(function(index,item){
                    //console.log($('.floors'))
                    // console.log($('.one_floor_bottom').eq(index));
                    if($('.one_floor_top').eq(index).offset().top-$('.one_floor_top').eq(index).height()*8<=$(window).scrollTop()&&$(window).scrollTop()<=$('.one_floor_bottom').eq(index).offset().top){
                        $('#floorlist>.leftlist').css({background:'#918888'});
        
                        $('#floorlist>.leftlist').eq(index).css({background:'#C81623'});
                        // console.log(index);
                    }
                })
                    
            })
        })
    })

    // 小图片右移
    $('.qualife-left_picone').mouseover(function(){
        $(this).css({backgroundPosition:'20px 0px'});
    }).mouseout(function(){
        $(this).css({backgroundPosition:'0px 0px'});
    });
    $('.qualife-left_pictwo_left').mouseover(function(){
        $(this).css({backgroundPosition:'-20px 0px'});
    }).mouseout(function(){
        $(this).css({backgroundPosition:'0px 0px'});
    });
    // console.log($('.one_floor_body_two img'));
    $('.one_floor img').mouseover(function(){
        $(this).css({marginTop:'-5px'});
    }).mouseout(function(){
       $(this).css({marginTop:'0px'});
    });
    $('.one_floor_two img').mouseover(function(){
        $(this).css({marginTop:'0px'});
    }).mouseout(function(){
       $(this).css({marginTop:'0px'});
    });
 
    $('.two_floor img').mouseover(function(){
        $(this).css({marginTop:'-5px'});
    }).mouseout(function(){
       $(this).css({marginTop:'0px'});
    });
    $('.three_floor img').mouseover(function(){
        $(this).css({marginTop:'-5px'});
    }).mouseout(function(){
       $(this).css({marginTop:'0px'});
    });
 
    // 二级菜单
    $('#menu_main_left>ul>li').mouseover(function(){
        $(this).children('.menu_one').show();

    }).mouseout(function(){
         $(this).children('.menu_one').hide();
    })

    // 右侧小选项卡
    $('.huafei').mouseover(function(){
        $('.huafei a').css({'border-top-color':'#E4E4E4'});
        $(this).children('a').css({'border-top':'2px solid red'});

        $('.rate').hide();
        $('.rate').eq($(this).index()).show();

    })

    // 换一换
    $(".huanyihuan>li:eq(0)").clone(true).appendTo($(".huanyihuan")); 
    var len1 = $(".huanyihuan>li").length;
    var liHeight = $(".huanyihuan>li").eq(0).height();
    console.log(liHeight);
    $(".huanyihuan").css({"height":liHeight*len1});

    // 回到起始点
    var ulHeight = liHeight * len1/2;
    var step = 1;
    // 定时器启动的标志
     var run1;

    // 设置滚动的函数
    function autoRun1(){
        // 将之前产生的定时器清除
        clearInterval(run1);     

        // 设置定时器
        run1 = setInterval(function(){
            // 进来时如果当前的滚动条的值>ulWidth 重置到0
            if($('.like_pic').scrollTop()>=liHeight){
                $('.like_pic').scrollTop(0);
        }

            // 移动之后的值
            var newScrollTop = $('.like_pic').scrollTop() + step;

            // 设置滚动条的值
            $('.like_pic').scrollTop(newScrollTop);

            // 如果现在的是liWidth的倍数，停止计时器
            if($('.like_pic').scrollTop()%liHeight==0 && $('.like_pic').scrollTop()>0){
                // 停止计时器
                clearInterval(run1);

                // 1s之后重新启动
                setTimeout(function(){
                    // 重新调用
                    autoRun1();
                },2000)
             }
        },10);
     } 

    // 设置setTimeout
    setTimeout(function(){
        autoRun1();
    },2000);
        
    // 鼠标移入时停止
    $('.like_pic').mouseover(function(){
         clearInterval(run1);
    }).mouseout(function(){
        // 重新调用
        autoRun1();
    });

    // 一楼选项卡
    // console.log($('.floor_one_font ul li'));
    $('.one_floor_xuan li').mouseover(function(){
        $('.one_floor_first').hide();
         $('.one_floor_two').hide();
        $('.one_floor').eq($(this).index()).show();
    })


})