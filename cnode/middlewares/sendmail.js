module.exports=function(str,uname,_id){
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'qq',
        port: 25, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: '1223105966@qq.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: 'dccjzqftqlfmjjif'
        }
    });
    // console.log(nodemailer);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '1223105966@qq.com', // 发件地址
        to: str, // 收件列表
        subject: '尊敬的 '+uname+' 您好：', // 标题

        text: 'Hello world ?', // 标题
        html: '<b>欢迎注册Cnode社区，请点击链接进行激活：</b><a href="http://192.168.17.65/user/doactive?_id='+_id+'" target="_blank">请点击本链接激活帐号</a>' // html 内容
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });

}
    


