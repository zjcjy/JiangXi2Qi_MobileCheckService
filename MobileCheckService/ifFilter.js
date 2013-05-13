// ifFilter.js 接口筛选器

var ifConfig = require('./config.js').ifConfig;

//接口筛选器对象模型，用于储存全局变量，及部分执行函数
var filter = {
    ifList:ifConfig.interfaceList,
    ifName:"",
    req:null,
    res:null,
    init: //加载函数，初始化筛选器对象
        function(_ifName,_req,_res){
            this.req=_req;
            this.res=_res;
            this.ifName=_ifName;
            this.onFilter(this);
        },
    onFilter:
        function(filter){
            var isHasInterface = false;
            //var ifNameLast = filter.ifName.split('/');
            for(var i=0;i<filter.ifList.length;i++){
                if(filter.ifName == filter.ifList[i])
                {
                    isHasInterface = true;
                    //var _ifObj = require('./Interface_'+ifNameLast[ifNameLast.length -1]+'.js');
                    var _ifObj = require('./Interface_'+filter.ifName+'.js');
                    _ifObj.Main(filter.req,filter.res);
                }
            }
            if(!isHasInterface) //如果不存在接口则进行下一步操作。
            {
                var fn = "";
                try{
                    fn = ifNameLast[ifNameLast.length -1].split('.');
                } catch(err) {
                    var jstb = require('./jsToolBox.js');
                    var sqlObj = jstb.sqlObj;
                    sqlObj.code = "-1";
                    sqlObj.cause = "没有对应的接口";
                    sqlObj.value = {};

                    this.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
                    this.res.write(JSON.stringify(sqlObj));
                    this.res.end();
                    return;
                }
                if(fn[fn.length-1] == "jpg" || fn[fn.length-1] == "png") //如果接口访问的后缀名是jpg或者png格式的话读取图片
                {
                    var fs = require('fs');
                    fs.readFile(filter.ifName,function (err,file){
                            filter.res.writeHead(200, {"Content-Type": "image/jpeg"});
                            filter.res.end(file);
                        }
                    );
                }
                else //否则提示不存在接口
                {
                    var jstb = require('./jsToolBox.js');
                    var sqlObj = jstb.sqlObj;
                    sqlObj.code = "-1";
                    sqlObj.cause = "没有对应的接口";
                    sqlObj.value = {};

                    this.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
                    this.res.write(JSON.stringify(sqlObj));
                    this.res.end();
                }
            }
        }
};

//接口与筛选器入口程序
exports.Main = function (_ifName,_req,_res){
    filter.init(_ifName,_req,_res);//载入接口筛选器对象所需参数
    //filter.onFilter(filter);
};