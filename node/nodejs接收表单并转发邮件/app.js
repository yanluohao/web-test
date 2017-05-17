var express = require("express");
var app = express();
var querystring = require('querystring');
var nodemailer = require("nodemailer");
// var router=express.Router();


app.post('/email', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    var postData = '';
    req.on('data', function(data) {
        postData += data;
    })
    req.on('end', function(data) {
        var query = querystring.parse(postData);
        console.log(query);
        switch (query.serviceType) {
            case 'enterprise':
                query.serviceType = '企业培训';
                break;
            case 'person':
                query.serviceType = '个人体验';
                break;
            case 'other':
                query.serviceType = '其他';
                break;
        }
        var transporter = nodemailer.createTransport({
            service: 'qq',
            // port: 80,
            auth: {
                user: 'youremail@qq.com',
                pass: '123456'
            }
        })

        var mailOptions = {
            from: 'youremail@qq.com',
            to: 'toemail@ruyucapital.com',
            subject: '埃摩森戏剧学院邮件',
            html: `姓名：${query.name}<br>
        	联系方式：${query.contact}<br>
        	服务类型：${query.serviceType}<br>
        	备注:${query.remarks}`
        }



        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error, 1);
            } else {
                console.log("成功" + info.response);
            }
        })
        res.send('success');
    })
})

app.get('/get',function(req,res){
    res.send(1234);
})

app.listen(80, () => {
    console.log('80窗口启动成功');
})
