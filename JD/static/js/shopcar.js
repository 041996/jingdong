$(function(){
    var m = $('.phone_pic_bnumber span').eq(1).html();
    var n = $('.phone_pic_bnumber span').eq(3).html();
    var w =parseInt(m)+parseInt(n);
    $('.allchecked').click(function(){
        // 判断是开启的还是取消了
        console.log($(this).attr('checked'));
        
        // 开还是关闭
        if($(this).attr('checked')){
            // 自己移除
            $(this).removeAttr('checked');
            $('.goods_one').css({background:'#fff'});
            // 下面的所有移除
            console.log($('#main').find('input[name=anniu]'));
            $('#main').find('input[name=anniu]').removeAttr('checked');
            // $(this).nextAll();
            $('.main_three span:last').text('￥'+0+'.00');
            $('.main_four span:last').text('￥'+0+'.00');
            $('.before_finish_top span').eq(0).text(0);
            $('.before_finish_top span').eq(2).text(0);
        }else{
            // 添加
            $(this).prop('checked','checked');
             $('.goods_one').css({background:'#fff4e8'});
            // 下面所有的添加
             $('#main').find('input[name=anniu]').prop('checked','checked');
             $('#main').find('input[name=anniu]').attr('checked','checked');

             $('.before_finish_top span').eq(0).text(i+j);
            $('.before_finish_top span').eq(2).text(i+j);
            $('.main_three span:last').text('￥'+w+'.00');
            $('.main_four span:last').text('￥'+w+'.00');
        }
    })

    $('input[name=anniu]:not(.allchecked)').eq(0).click(function(){
        if($(this).attr('checked')){
            $(this).removeAttr('checked');
            $('input[name=anniu]:not(.allchecked)').eq(1).removeAttr('checked');
            $('.goods_one').eq(0).css({background:'#fff'});
            $('.allchecked').removeAttr('checked');
            $('.main_three span:last').text(n);
            $('.main_four span:last').text(n);
             // $('.main_four span:last').text('￥'+0+'.00');
        }else{
            if($('input[name=anniu]:not(.allchecked)').eq(2).attr('checked')){
              $('.allchecked').prop('checked','checked');
              $('.allchecked').attr('checked','checked'); 
              $('.main_three span:last').text('￥'+0+'.00');
              $('.main_four span:last').text('￥'+0+'.00');
            }else{
                $('.main_three span:last').text('￥'+m);
                $('.main_four span:last').text('￥'+m);
                $('.before_finish_top span').eq(0).text(i);
                $('.before_finish_top span').eq(2).text(i);
            }

           
            
            $(this).prop('checked','checked');
            $(this).attr('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(1).prop('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(1).attr('checked','checked');
            $('.goods_one').eq(0).css({background:'#fff4e8'});
            $('.allchecked').attr('checked','checked'); 
            
        }
        
    })
    
    $('input[name=anniu]:not(.allchecked)').eq(2).click(function(){
        if($(this).attr('checked')){
            $(this).removeAttr('checked');
            $('input[name=anniu]:not(.allchecked)').eq(3).removeAttr('checked');
            $('.goods_one').eq(1).css({background:'#fff'});
            $('.allchecked').removeAttr('checked');
            // $('.main_three span:last').text(m);
            // $('.main_four span:last').text(m);
        }else{
            if($('input[name=anniu]:not(.allchecked)').eq(1).attr('checked')){
                $('.allchecked').prop('checked','checked');
                $('.allchecked').attr('checked','checked'); 
                $('.main_three span:last').text('￥'+w+'.00');
                $('.main_four span:last').text('￥'+w+'.00');
            }else{
                $('.main_three span:last').text('￥'+n);
                $('.main_four span:last').text('￥'+n);
            }
            $(this).prop('checked','checked');
            $(this).attr('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(3).prop('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(3).attr('checked','checked');
            $('.goods_one').eq(1).css({background:'#fff4e8'});
            $('.allchecked').attr('checked','checked');
            
        }
        
    })
    $('input[name=anniu]:not(.allchecked)').eq(1).click(function(){
        if($(this).attr('checked')){
            $(this).removeAttr('checked');
            $('input[name=anniu]:not(.allchecked)').eq(0).removeAttr('checked');
            $('.goods_one').eq(0).css({background:'#fff'});
            $('.allchecked').removeAttr('checked');
            $('.main_three span:last').text(n);
            $('.main_four span:last').text(n);
        }else{
            if($('input[name=anniu]:not(.allchecked)').eq(2).attr('checked')){
                $('.allchecked').prop('checked','checked');
                $('.allchecked').attr('checked','checked'); 
                $('.main_three span:last').text('￥'+w+'.00');
                $('.main_four span:last').text('￥'+w+'.00');
            }
            $(this).prop('checked','checked');
            $(this).attr('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(0).prop('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(0).attr('checked','checked');
            $('.goods_one').eq(0).css({background:'#fff4e8'});
            $('.allchecked').attr('checked','checked');
            $('.main_four span:last').text(n);
            
        }
        
    })

    $('input[name=anniu]:not(.allchecked)').eq(3).click(function(){
        if($(this).attr('checked')){
            $(this).removeAttr('checked');
            $('input[name=anniu]:not(.allchecked)').eq(2).removeAttr('checked');
            $('.goods_one').eq(1).css({background:'#fff'});
            $('.allchecked').removeAttr('checked');
            $('.main_three span:last').text(m);
            $('.main_four span:last').text(m);
        }else{
            if($('input[name=anniu]:not(.allchecked)').eq(0).attr('checked')){
                $('.allchecked').prop('checked','checked');
                $('.allchecked').attr('checked','checked'); 
            }
            $(this).prop('checked','checked');
            $(this).attr('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(2).prop('checked','checked');
            $('input[name=anniu]:not(.allchecked)').eq(2).attr('checked','checked');
            $('.goods_one').eq(1).css({background:'#fff4e8'});
            $('.allchecked').attr('checked','checked');

            $('.main_three span:last').text('￥'+w+'.00');
            $('.main_four span:last').text('￥'+w+'.00');
            
        }
        
    })
   console.log($('input[name=anniu]:not(.allchecked)').eq(2));
   console.log($('.after_bnumber_one a').eq(1));
        
  var i=1;
    var o;
    var p;
    $('.after_bnumber_one a').eq(1).click(function(){
         i++;
        $('.before_finish_top span').eq(0).text(i+j);
        $('.before_finish_top span').eq(2).text(i+j);
        $('.after_bnumber_two a').eq(0).html(i);
        $('.phone_pic_bnumber span').eq(1).html(m*i+'.00');
          e = $('.phone_pic_bnumber span').eq(1).html();
          d= $('.phone_pic_bnumber span').eq(3).html();
         w =parseInt(e)+parseInt(d);
        p=m*i;
        // console.log(p);
        $('input[name=anniu]:not(.allchecked)').eq(1).prop('checked','checked');
        $('input[name=anniu]:not(.allchecked)').eq(1).attr('checked','checked');
        $('input[name=anniu]:not(.allchecked)').eq(0).prop('checked','checked');
        $('input[name=anniu]:not(.allchecked)').eq(0).attr('checked','checked');
        $('.goods_one').eq(0).css({background:'#fff4e8'});
        if($('input[name=anniu]:not(.allchecked)').eq(2).attr('checked')){
            $('input[name=anniu]').prop('checked','checked');
          $('.main_three span:last').text('￥'+w+'.00');
          $('.main_four span:last').text('￥'+w+'.00');
                
        }else{
            $('.main_three span:last').text('￥'+p+'.00');
          $('.main_four span:last').text('￥'+p+'.00');
        }
             
        // console.log($('.main_three span:last').text('￥'+p+'.00'));
        // console.log($('.main_four span:last').text('￥'+p+'.00'));
    })
    $('.after_bnumber_one a').eq(0).click(function(){
        i--;
        
        if(i<=1){
            i=1;
            o=m;
         }
        $('.before_finish_top span').eq(0).text(i+j);
        $('.before_finish_top span').eq(2).text(i+j);
        $('.after_bnumber_two a').eq(0).html(i);
        $('.phone_pic_bnumber span').eq(1).html(m*i+'.00');
        o = m*i;
        // console.log(o);
              
        // console.log($('.main_four span:last').text('￥'+o+'.00'));
        e = $('.phone_pic_bnumber span').eq(1).html();
          d= $('.phone_pic_bnumber span').eq(3).html();
         w =parseInt(e)+parseInt(d);
        if($('input[name=anniu]:not(.allchecked)').eq(2).attr('checked')){

          $('.main_three span:last').text('￥'+w+'.00');
          $('.main_four span:last').text('￥'+w+'.00');
                
        }else{
            $('.main_three span:last').text('￥'+o+'.00');
            $('.main_four span:last').text('￥'+o+'.00');
        }
    })
   


    var j=1;
    var q;
    var r;
       
    $('.after_bnumber_one a').eq(3).click(function(){
        j++;
        $('.before_finish_top span').eq(0).text(i+j);
        $('.before_finish_top span').eq(2).text(i+j);
        $('.after_bnumber_two a').eq(1).html(j);
        $('.phone_pic_bnumber span').eq(3).html(n*j+'.00')
        q=n*j;
        // console.log(q);
            
        $('input[name=anniu]:not(.allchecked)').eq(2).prop('checked','checked');
        $('input[name=anniu]:not(.allchecked)').eq(2).attr('checked','checked');
        $('input[name=anniu]:not(.allchecked)').eq(3).prop('checked','checked');
        $('input[name=anniu]:not(.allchecked)').eq(3).attr('checked','checked');
        $('.goods_one').eq(1).css({background:'#fff4e8'});

        // $('.main_three span:last').text('￥'+m+'.00');
        
        e = $('.phone_pic_bnumber span').eq(1).html();
          d= $('.phone_pic_bnumber span').eq(3).html();
          w =parseInt(e)+parseInt(d);
        if($('input[name=anniu]:not(.allchecked)').eq(1).attr('checked')){
            $('input[name=anniu]').prop('checked','checked');
            $('.main_three span:last').text('￥'+w+'.00');
          $('.main_four span:last').text('￥'+w+'.00');
               
        }else{
            $('.main_three span:last').text('￥'+q+'.00');
            $('.main_four span:last').text('￥'+q+'.00');
        }
    })
    $('.after_bnumber_one a').eq(2).click(function(){
        j--;
        if(j<=1){
            j=1;
            r=m;
         }
        $('.before_finish_top span').eq(0).text(i+j);
        $('.before_finish_top span').eq(2).text(i+j);
        $('.after_bnumber_two a').eq(1).html(j);
        $('.phone_pic_bnumber span').eq(3).html(n*j+'.00');
        r=n*j;
        // console.log(r);
           
        e = $('.phone_pic_bnumber span').eq(1).html();
          d= $('.phone_pic_bnumber span').eq(3).html();
          w =parseInt(e)+parseInt(d);
        if($('input[name=anniu]:not(.allchecked)').eq(1).attr('checked')){

          $('.main_three span:last').text('￥'+w+'.00');
          $('.main_four span:last').text('￥'+w+'.00');
                
        }else{
              $('.main_three span:last').text('￥'+m+'.00');
            $('.main_four span:last').text('￥'+m+'.00');
            $('.main_three span:last').text('￥'+r+'.00');
            $('.main_four span:last').text('￥'+r+'.00');
         }
    }) 

    // 点击删除
    // console.log($('.goods_one_pic_bottom').eq(0));

    $('.phone_pic_tnumber').eq(0).click(function(){
        // $('input[name=anniu]:not(.allchecked)').eq(1).attr('checked',false);
        $('.goods_one').eq(0).hide();
        $('.main_two').eq(0).hide();
        $('.main_four').empty();
        if($('input[name=anniu]:not(.allchecked)').eq(1).attr('checked')){
            $('.main_three span:last').text('￥'+n);
            $('.after_bnumber_one a').eq(4).click(function(){
              
              w =parseInt(m*i)-parseInt(n*j);
              $('.main_three span:last').text('￥'+w+'.00');
            })
        }
        // if($('.goods_one').eq(1).hide()){
        //     $('.main_three span:last').text('￥'+0+'.00');
        // }
    })
    $('.phone_pic_tnumber').eq(1).click(function(){
       // $('input[name=anniu]:not(.allchecked)').eq(3).attr('checked',false);
        $('.goods_one').eq(1).hide();
        $('.main_two').eq(1).hide();
        $('.main_four').empty();
        if($('input[name=anniu]:not(.allchecked)').eq(2).attr('checked')){
            $('.main_three span:last').text('￥'+n);
            $('.after_bnumber_one a').eq(4).click(function(){
              w =parseInt(m*i)-parseInt(n*j);
              $('.main_three span:last').text('￥'+w+'.00');
            })
        }
    })
    // console.log( $('.after_bnumber_two a').eq(0));
    // console.log($('.before_finish_top span'));
    $('.before_finish_top span').eq(0).text(i+j);
    $('.before_finish_top span').eq(2).text(i+j);

   // 下面的滚动事件
   // console.log($('.main_four'));
   // console.log($(window).height());
   var main_threeTop = $('.main_three').offset().top;
   // console.log(main_threeTop);
   $(window).scroll(function(){
       if(main_threeTop-$(window).scrollTop()>=$(window).height()){
             $('.main_four').show();
        }else{
            $('.main_four').hide();
       } 
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

    var youcemenutop = $('#youcemenu').offset().top;
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        var newyoumenuTop = scrollTop + youcemenutop;
        // console.log(newyoumenuTop);
        $('#youcemenu').offset({top:newyoumenuTop});

    })
    
})
    
  