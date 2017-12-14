// 注册页面

var main_left = document.getElementById('main_left');
// console.log(main_left);
var formsub = main_left.getElementsByClassName('formsub');
// console.log(formsub);
var input = document.getElementsByTagName('input');
console.log(input[0]);
var input_bottom = document.getElementsByClassName('input_bottom');
console.log(input_bottom);
var span0 = input_bottom[0].getElementsByTagName('span')[0];
console.log(span0);
console.log(span0.innerHTML);
var square = input_bottom[0].getElementsByClassName('square');
console.log(square);

var span1 = input_bottom[1].getElementsByTagName('span')[0];
var square1 = input_bottom[1].getElementsByClassName('square');

var span2 = input_bottom[2].getElementsByTagName('span')[0];
var square2 = input_bottom[2].getElementsByClassName('square');
// for(var i=0;i<formsub.length;i++){
//     formsub[i].onsubmit = function(){
        

        
//         if(!isUsername || !isUserpwd){
//             return false;
//         }
//     }
// }

input[0].onblur = function(){
    
    var reg = /^[a-z_]\w{5,19}$/i;
    var isUsername = input[0].value;
    input[0].placeholder = '您的账户名和登录名';
    console.log(isUsername);
    var res = reg.test(isUsername);
    if(res){
        span0.innerHTML = '正确';
        console.log(333);
    }else if(isUsername==""){
        this.nextElementSibling.style.display = 'none';
    }else{
        this.nextElementSibling.style.display = 'block';
         span0.innerHTML = '按要求注册';
         span0.style.color = 'red';
         square[0].style.backgroundPosition='-18px -100px';
        console.log(444);
    }
                
}
input[1].onblur = function(){
    
    var reg = /^[a-z_]\w{5,19}$/i;
    var isUsername = input[1].value;
    input[1].placeholder = '建议至少使用两种字符';
    console.log(isUsername);
    var res = reg.test(isUsername);
    if(res){
        span1.innerHTML = '正确';
        console.log(333);
    }else if(isUsername==""){
        this.nextElementSibling.style.display = 'none';
    }else{
        this.nextElementSibling.style.display = 'block';
         span1.innerHTML = '按要求注册';
         span1.style.color = 'red';
         square1[0].style.backgroundPosition='-18px -100px';
        console.log(444);
    }
                
}
input[2].onblur = function(){
    
    var reg = /^[a-z_]\w{5,19}$/i;
    var isUsername = input[2].value;
    input[2].placeholder = '请再次输入密码';
    console.log(isUsername);
    var res = reg.test(isUsername);
    if(input[2].value!==input[1].value){
        span2.innerHTML = '两次密码不一致，请重新输入!';
        span2.style.color = 'red';
         square2[0].style.backgroundPosition='-18px -100px';
    }else if(res){
        span2.innerHTML = '正确';
        console.log(333);
    }else if(isUsername==""){
        this.nextElementSibling.style.display = 'none';
    }else{
        this.nextElementSibling.style.display = 'block';
         span2.innerHTML = '按要求注册';
         span2.style.color = 'red';
         square2[0].style.backgroundPosition='-18px -100px';
        console.log(444);
    }
                
}

for(var j=0;j<input.length;j++){
    // inputFont = input[j].placeholder;
    input[j].onfocus = function(){
        this.placeholder = '';
        this.nextElementSibling.style.display = 'block';
    }
    // input[j].onblur = function(){
    //     this.nextElementSibling.style.display = 'none';
    //     
    //     input[1].placeholder = '';
    //     input[2].placeholder = '';
    //     input[3].placeholder = '建议使用常用手机';
    //     input[4].placeholder = '请输入验证码';
    //     input[5].placeholder = '请输入手机验证码';
    // }
}
