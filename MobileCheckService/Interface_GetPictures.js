/**
 * Created with JetBrains WebStorm.
 * 获取照片列表，督导和风险调查员使用。
 * User: 陈瑾毅
 * Date: 13-4-15
 * Time: 上午10:20
 * To change this template use File | Settings | File Templates.
 */

//接口入口函数
exports.Main = function (_req,_res) {
    var ifObj= {
        req:null,
        res:null,
        userName:"",
        accessToken:"",
        caseNo:"",
        sqlCmd:""
    };
    var jstb = require('./jsToolBox.js');
    var CaseNo,AccessToken;
    try{
        CaseNo = jstb.getParam(_req,"CaseNo");
    }catch (err){}
    try{
        AccessToken = jstb.getParam(_req,"AccessToken");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.accessToken = AccessToken;
    ifObj.caseNo = CaseNo;

    //判断信令是否合法
    var at = require('./Interface_AccessToken.js');
    at.checkAccessToken(ifObj.accessToken,onAccessTokenCallBack,ifObj);
};


//接口对应的信令回调函数
function onAccessTokenCallBack(_result,_ifObj){
    var sqlObj = {
        code:"0",
        cause:"",
        value:{}
    };
    if(_result)
    {
        var cfg = require('./config.js');
        var picsLocation = cfg.picsLocation + "/" + _ifObj.caseNo + "/";
        var fs = require('fs');
        fs.mkdir(picsLocation,0777,function () {
            fs.readdir("./" + picsLocation + "/", function (err, files) {//读取文件夹下文件
                if (err) {
                    sqlObj.code = "-1";
                    sqlObj.cause = "照片上传失败。";
                    sqlObj.value = {};
                } else {
                       var pic_list = [];
                       for(var i=0;i<files.length;i++)
                            {
                                pic_list[i] = {"ImagePath":picsLocation + files[i]};
                            }
                    sqlObj.code = "0";
                    sqlObj.cause = "";
                    sqlObj.value = {"pic_list":pic_list};
                    _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
                    _ifObj.res.write(JSON.stringify(sqlObj));
                    _ifObj.res.end();
                }
            });
        });//mkdir
    }
    else
    {
        sqlObj.code = "-1";
        sqlObj.cause = "AccessToken已失效。";
        sqlObj.value = {};
        _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
        _ifObj.res.write(JSON.stringify(sqlObj));
        _ifObj.res.end();
    }
}



