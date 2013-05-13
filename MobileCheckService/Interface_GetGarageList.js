/**
 * Created with JetBrains WebStorm.
 * 获取推修列表。
 * User: 陈瑾毅
 * Date: 13-4-12
 * Time: 12:20
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
    var AccessToken;
    try{
        AccessToken = jstb.getParam(_req,"AccessToken");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.accessToken = AccessToken;
    ifObj.sqlCmd = "select GarageID,AreaID,ShortName,CarType,Telephone,Address,Latitude,Longitude,ImgPath,Memo,MoneyLimit from Garage order by MoneyLimit desc";

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
        var sqlConn = require('./sqlFilter.js');
        sqlConn.queryData(_ifObj.sqlCmd,onSqlCallBack,_ifObj);
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


//接口对应数据库输出回调函数
function onSqlCallBack(_result,_ifObj){
    var sqlObj = {
        code:"0",
        cause:"",
        value:{}
    };
    if(_result.success)
    {
        sqlObj.code = "0";
        sqlObj.cause = "";
        sqlObj.value = {"repair_list":_result.data};
    }
    else
    {
        sqlObj.code = "-1";
        sqlObj.cause = _result.msg;
        sqlObj.value = {};
    }
    _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
    _ifObj.res.write(JSON.stringify(sqlObj));
    _ifObj.res.end();
}

