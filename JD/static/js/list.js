$(function(){
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

    var youcemenutop = $('#youcemenu').offset().top;
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        var newyoumenuTop = scrollTop + youcemenutop;
        // console.log(newyoumenuTop);
        $('#youcemenu').offset({top:newyoumenuTop});

    })

    // 插入删除节点
    $('.main_three_two_middle a').click(function(){
        // console.log($('.main_three_two_middle:eq(0) a'));
        var zi = $(this).text();
        var ziq = $(this).parent().prev().text();
        // console.log(ziq);
        var newDiv3 = $('<div class="newtianjia"><p>'+ziq+'<span>'+zi+'</span></p><a>x</a></div>');
        var res = $(this).parent().parent();
        res.hide();
        $('.main_three_two:last').before(newDiv);
        $('.main_three_two:last').prev().show();
        $('.main_one_font span:last').before(newDiv3);
        
        newDiv3.click(function(){
            // alert(111);
            $(this).hide();
            res.show();
            $('.main_three_two:last').prev().hide();
        })
    })


    var newDiv = $('<div class="main_three_two"><div class="main_three_two_left"><p>运行内存：</p></div><div class="main_three_two_middle"><a>2GB</a><a>3GB</a><a>4GB</a><a>6GB</a><a>无</a><a>其他</a></div><div class="main_three_one_last"><div class="jiahao"></div><a href="#">多选</a></div></div>');
    $('.main_three_two_middle:eq(0) a').click(function(){
        $('.main_three_two:last').before(newDiv);
        $('.main_three_two:last').prev().show();
    })
     var newDiv2 = $('<div class="main_three_two"><div class="main_three_two_left"><p>价格：</p></div><div class="main_three_two_middle"><a>0-199</a><a>200-299</a><a>4GB</a><a>300-599</a><a>600-1899</a><a>1900以上</a></div><div class="main_three_one_last"><div class="jiahao"></div><a href="#">多选</a></div></div>');
    $('.main_three_two_middle:eq(1) a').click(function(){
        // $(this).parent().parent().hide();
        $('.main_three_two:last').before(newDiv2);
        $('.main_three_two:last').prev().show();
        
    })


    // 更多
   var res=true;
    console.log($('.main_three_one_right').eq(0));
    $('.main_three_one_right').eq(0).click(function(){
         
        if(res){
            $('.main_three_one').height(220);
            $('.main_three_one').css({border:'1px solid #ccc'});
            $('.main_three_one_left').height(220);
            $('.main_three_one_middle').height(200);
            $('.main_three_one_middle').width(960);

            $('.main_three_one_middle').css({overflowY:'scroll'});
            $('.main_three_one_right:eq(0) a').text('收起');
            $('.main_three_one_right:eq(0) .jiantou').css({backgroundPosition:'3px -33px'});
            $(this).mouseover(function(){
                 $('.main_three_one_right:eq(0) .jiantou').css({backgroundPosition:'3px -50px'});
            }).mouseout(function(){
                $('.main_three_one_right:eq(0) .jiantou').css({backgroundPosition:'3px -33px'});
            })
            res=!res;
        }else{
            $('.main_three_one').height(120);
            $('.main_three_one_left').height(120);
            $('.main_three_one_middle').height(100);
            $('.main_three_one').css({borderLeft:'none',borderRight:'none'});
            $('.main_three_one_middle').css({overflow:'hidden'});
            $('.main_three_one_right:eq(0) a').text('更多');
            $('.main_three_one_right:eq(0) .jiantou').css({backgroundPosition:'3px 0px'});
            $(this).mouseover(function(){
                 $('.main_three_one_right:eq(0) .jiantou').css({backgroundPosition:'3px -17px'});
            }).mouseout(function(){
                $('.main_three_one_right:eq(0) .jiantou').css({backgroundPosition:'3px 0px'});
            })
                
            res=!res;
            // console.log(res);
        }
            
    })




})