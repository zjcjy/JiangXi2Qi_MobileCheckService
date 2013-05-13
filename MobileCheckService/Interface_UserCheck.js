/**
 * Created with JetBrains WebStorm.
 * 校验用户，返回用户相关信息
 * User: 陈瑾毅
 * Date: 13-4-13
 * Time: 上午11:20
 * To change this template use File | Settings | File Templates.
 */

//接口入口函数
exports.Main = function (_req,_res) {
    var ifObj= {
        req:null,
        res:null,
        accessToken:"",
        caseNo:"",
        sqlObj:null,
        sqlCmd:""
    };

    var jstb = require('./jsToolBox.js');
    var UserName,PassWord,IMEI;
    try{
        UserName = jstb.getParam(_req,"UserName");
    } catch (err) {}

    try{
        PassWord = jstb.getParam(_req,"PassWord");
    }catch (err){}

    try{
        IMEI = jstb.getParam(_req,"IMEI");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.userName = UserName;
    ifObj.sqlCmd = "select UserID,UserName,UserClass,IMEI,Telephone,Email,RealName,AreaID from Users where UserName='" + UserName + "' and PassWord = '" + PassWord + "'  and UserState > -1";

    //判断用户
    var sqlConn = require('./sqlFilter.js');
    sqlConn.queryData(ifObj.sqlCmd,onSqlCallBack,ifObj);


};

//接口对应的信令回调函数
function onAccessTokenCallBack(_result,_ifObj){
    var sqlObj = {
        code:"0",
        cause:"",
        value:{}
    };
    if(_result != "")
    {
        _ifObj.sqlObj.value.AccessToken = _result;
    }
    else
    {
        sqlObj.code = "-1";
        sqlObj.cause = "AccessToken创建失败。";
        sqlObj.value = {};
    }
    _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
    _ifObj.res.write(JSON.stringify(_ifObj.sqlObj));
    _ifObj.res.end();
}

//接口对应数据库输出函数
function onSqlCallBack(_result,_ifObj){
    var sqlObj = {
        code:"0",
        cause:"",
        value:{}
    };
    if(_result.success)
    {
        if(_result.data.length >0){
            sqlObj.code = "0";
            sqlObj.cause = "";
            sqlObj.value = _result.data[0];
            _ifObj.sqlObj = sqlObj;
            //如果用户正确，则去获取信令
            var at = require('./Interface_AccessToken.js');
            at.getAccessToken(_ifObj.accessToken,onAccessTokenCallBack,_ifObj);
        } else {
            sqlObj.code = "-1";
            sqlObj.cause = "用户名或密码有误。";
            sqlObj.value = {};
            _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
            _ifObj.res.write(JSON.stringify(sqlObj));
            _ifObj.res.end();
        }

    }
    else
    {
        sqlObj.code = "-1";
        sqlObj.cause = _result.msg;
        sqlObj.value = {};
        _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
        _ifObj.res.write(JSON.stringify(sqlObj));
        _ifObj.res.end();
    }


}