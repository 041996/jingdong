
module.exports=function(phone){
    var App = require('alidayu-node');
    var app = new App('23579342', '7ae59fb889730ce0fe5845bbdc5f066a');
     
    app.smsSend({
        sms_free_sign_name: '登录验证', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: JSON.stringify({"node": "123456"}),//短信变量，对应短信模板里面的变量
        rec_num: phone, //接收短信的手机号
        sms_template_code: 'SMS_35825113' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
    });

}
    


