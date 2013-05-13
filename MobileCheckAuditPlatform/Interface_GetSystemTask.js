/**
 * Created with JetBrains WebStorm.
 * 获得系统任务（未分配任务)。
 * User: 陈瑾毅
 * Date: 13-5-7
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
    var CallbackName;
    try{
        CallbackName = jstb.getParam(_req,"callbackname");
    } catch (err) {}
    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.callbackname = CallbackName;
    ifObj.sqlCmd = "select TaskID, TaskType, FrontOperator, FrontState, RealName,BackOperator, BackState, Watcher, DATE_FORMAT(StateUpdateTime,'%Y-%m-%d %H:%I:%S') as StateUpdateTime, task.CaseNo, task.Memo , CarMark, CarDriver, CarOwner, carcase.Telephone, Address, ImgPath, EstPrice, AuditPrice, FixedPrice, carcase.Latitude, carcase.Longitude, DATE_FORMAT(AccidentTime,'%Y-%m-%d %H:%I:%S') as AccidentTime from task,carcase,users where task.CaseNo = carcase.CaseNo and FrontOperator = UserName";
    var taskTypeStr = " and TaskType in ('查勘','拆检')";
    var frontStateStr = " and FrontState in (4,5)";
    var backOperatorStr = " and (BackOperator = '' or isNull(BackOperator))";
    ifObj.sqlCmd += taskTypeStr + frontStateStr + backOperatorStr;
    //console.log(ifObj.sqlCmd);
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
        sqlObj.success = true;
        sqlObj.code = "0";
        sqlObj.cause = "";
        sqlObj.value = {"systemtask_list":_result.data};
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

