//<模板演示>接口

exports.Main = function (_req,_res)	{
    var ifObj= {
        req:null,
        res:null,
        userName:"",
        accessToken:"",
        caseNo:"",
        sqlCmd:""
    };
    var jstb = require('./jsToolBox.js');
    var CaseNo,MD5,AccessToken;
    try{
        CaseNo = jstb.getParam(_req,"CaseNo");
    }catch (err){}
    try{
        MD5 = jstb.getParam(_req,"MD5");
    }catch (err){}
    try{
        AccessToken = jstb.getParam(_req,"AccessToken");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.accessToken = AccessToken;
    ifObj.caseNo = CaseNo;
    ifObj.MD5 = MD5.toLocaleLowerCase();

    var at = require('./Interface_AccessToken.js');
    at.checkAccessToken(ifObj.accessToken,onAccessTokenCallBack,ifObj);
};

//接口对应的信令回调函数
function onAccessTokenCallBack(_result,_ifObj){
    //系统的文件系统支持框架
    var fs = require('fs');

    //配置用JS文件 Config.js
    var cfg = require('./config.js');

    var sqlObj = {
        code:"0",
        cause:"",
        value:{}
    };

    if(_result)
    {
        var picsLocation = cfg.picsLocation;
        var tmp_path = "";
        // 获得文件的临时路径
        try {
            tmp_path = _ifObj.req.files.FilePath.path;
        } catch (err) {
            sqlObj.code = "-1";
            sqlObj.cause = "照片文件有误。";
            sqlObj.value = {};
            _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
            _ifObj.res.write(JSON.stringify(sqlObj));
            _ifObj.res.end();
        }

        // 指定文件上传后的目录和文件名
        var target_path = "./" + picsLocation + "/" + _ifObj.caseNo + '/' + _ifObj.req.files.FilePath.name;

        //创建对应目录
        fs.mkdir(picsLocation + "/" + _ifObj.caseNo + '/',0777,function () {
            //读取临时文件
            fs.readFile(tmp_path, function(error, data){
                if(MD5Check(data,_ifObj.MD5))
                {
                //写入到对应文件中
                    fs.writeFile(target_path, data, function (err) {
                        if (err)
                        {
                            sqlObj.code = "-1";
                            sqlObj.cause = "照片上传失败。";
                            sqlObj.value = {};
                        }
                        else
                        {
                            sqlObj.code = "0";
                            sqlObj.cause = "";
                            sqlObj.value = {};
                        }
                        _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
                        _ifObj.res.write(JSON.stringify(sqlObj));
                        _ifObj.res.end();
                    });//writefile
                }//if(MD5Check(data,_ifObj.MD5))
                else
                {
                    sqlObj.code = "-1";
                    sqlObj.cause = "照片MD5码校验不正确。";
                    sqlObj.value = {};
                    _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
                    _ifObj.res.write(JSON.stringify(sqlObj));
                    _ifObj.res.end();
                }
            });//readfile
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

//MD5校验
function MD5Check(_data,_MD5)
{
    var crypto = require('crypto');
    var getMD5 = crypto.createHash('md5');
    var _dataMD5 = getMD5.update(_data).digest('hex');
    if(_dataMD5 == _MD5)
        return true;
    return false;
}