/**
 * Created with JetBrains WebStorm.
 * 获得指定用户的相关任务信息，返回的任务列表中不包括已经完成的任务。
 * User: 陈瑾毅
 * Date: 13-4-12
 * Time: 上午11:20
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
    var UserName,AccessToken;
    try{
        UserName = jstb.getParam(_req,"UserName");
    } catch (err) {}

    try{
        AccessToken = jstb.getParam(_req,"AccessToken");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.userName = UserName;
    ifObj.accessToken = AccessToken;
    ifObj.sqlCmd = "select TaskID,CarCase.CaseNo,CarMark,CarDriver,Telephone,Address,EstPrice,AuditPrice,FixedPrice,Latitude,Longitude,TaskType,FrontOperator,FrontState,BackOperator,BackState,Watcher,Task.AccidentTime,Task.Memo from CarCase,Task where CarCase.CaseNo = Task.CaseNo and (FrontOperator = '" + UserName + "' or BackOperator='" + UserName + "' or Watcher = '" + UserName + "') and BackState < 5";
    var sqlConn = require('./sqlFilter.js');
    sqlConn.queryData(ifObj.sqlCmd,onSqlCallBack,ifObj);
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
        sqlObj.code = "0";
        sqlObj.cause = "";
        sqlObj.value = {"task_list":_result.data};
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

