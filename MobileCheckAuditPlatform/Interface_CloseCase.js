/**
 * Created with JetBrains WebStorm.
 * 结案函数。
 * User: 陈瑾毅
 * Date: 13-5-14
 * Time: 下午午 22:00
 * To change this template use File | Settings | File Templates.
 */

//接口入口函数
exports.Main = function (_req,_res) {
    var ifObj= {
        req:null,
        res:null,
        username:"",
        callbackname:"",
        caseNo:"",
        sqlCmd:""
    };
    var jstb = require('./jsToolBox.js');
    var UserName,TaskID,CallbackName;
    try{
        UserName = jstb.getParam(_req,"username");
    } catch (err) {}
    try{
        TaskID = jstb.getParam(_req,"taskid");
    } catch (err) {}
    try{
        CallbackName = jstb.getParam(_req,"callbackname");
    } catch (err) {}
    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.username = UserName;
    ifObj.taskID = TaskID;
    ifObj.callbackname = CallbackName;
    ifObj.sqlCmd = "update task set BackOperator = '" + UserName + "',BackState = '3' where TaskID = '"+ TaskID +"' and BackState = '0' and (BackOperator = '' or isNull(BackOperator))";
    //console.log(ifObj.sqlCmd);
    var sqlConn = require('./sqlFilter.js');
    sqlConn.updateData(ifObj.sqlCmd,onSqlCallBack,ifObj);
};

//接口对应数据库输出回调函数
function onSqlCallBack(_result,_ifObj){
    var sqlObj = {
        success:false,
        code:"0",
        cause:"",
        value:{}
    };
    if(_result.success)
    {
        sqlObj.success = true;
        sqlObj.code = "0";
        sqlObj.cause = "";
        sqlObj.value = _result.data;
    }
    else
    {
        sqlObj.success = false;
        sqlObj.code = "-1";
        sqlObj.cause = "数据库查询错误。";//_result.msg;
        sqlObj.value = {};
    }

    var respStr = JSON.stringify(sqlObj);

    //判断是否jsonp调用
    if(_ifObj.callbackname != "")
        respStr = _ifObj.callbackname + "(" + respStr + ");";

    _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
    _ifObj.res.write(respStr);
    _ifObj.res.end();
}

