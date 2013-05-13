var express = require('express');
var app = express();
//req.params.xxxxx 从path中的变量 
//req.query.xxxxx 从get中的?xxxx=中 
//req.body.xxxxx 从post中的变量 

console.log("服务器启动 at :" + new Date());
app.use(express.bodyParser());//转化为获取body为post对象
//app.use(express.cookieParser());
//app.use(express.bodyParser({uploadDir:'./uploads'}));

app.all('/MobileCheckService/*',
	function(req, res) {
		var ifName = req.params[0];//接口名
        var ifFilter = require('./MobileCheckService/ifFilter.js');//加载接口筛选器
        ifFilter.Main(ifName,req,res);
		}
);
app.all('/MobileCheckAuditPlatform/*',
    function(req, res) {
        var ifName = req.params[0];//接口名
        var ifFilter = require('./MobileCheckAuditPlatform/ifFilter.js');//加载接口筛选器
        ifFilter.Main(ifName,req,res);
    }
);
app.all('/pics/*',
    function(req, res) {
        var ifName = req.params[0];//图片名
        var fs = require('fs');
        fs.readFile("pics/" + ifName,function (err,file){
                res.writeHead(200, {"Content-Type": "image/jpeg"});
                res.end(file);
            }
        );
    }
);

app.listen(8000);