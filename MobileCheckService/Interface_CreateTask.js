/**
 * Created with JetBrains WebStorm.
 * 创建任务。
 * User: 陈瑾毅
 * Date: 13-4-17
 * Time: 11:20
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
        sqlCmd:"",
        okStep:0,
        errStep:0
    };

    var jstb = require('./jsToolBox.js');
    var TaskJsonList,AccessToken;
    try{
        //console.log(jstb.getParam(_req,"TaskJsonList"));
        TaskJsonList = JSON.parse(jstb.getParam(_req,"TaskJsonList"));
    } catch (err) {
        var sqlObj = {
            code:"0",
            cause:"",
            value:{}
        };
        sqlObj.code = "-1";
        sqlObj.cause = "TaskJsonList有误。";
        sqlObj.value = {};
        _res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
        _res.write(JSON.stringify(sqlObj));
        _res.end();

    }
    try{
        AccessToken = jstb.getParam(_req,"AccessToken");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.accessToken = AccessToken;
    ifObj.taskList = TaskJsonList;
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
        for(var i=0;i<_ifObj.taskList.length;i++)
        {
            var ifObjTask = _ifObj.taskList[i];
            //var sqlcmd = "exec createtask '"+ifObjTask.CaseNo+"','"+ifObjTask.CarMark+"','"+ifObjTask.CarOwner+"','"+ifObjTask.CarDriver+"','"+ifObjTask.Telephone+"','"+ifObjTask.Address+"',"+ifObjTask.EstPrice+","+ifObjTask.AuditPrice+","+ifObjTask.FixedPrice+","+ifObjTask.Latitude+","+ifObjTask.Longitude+",'"+ifObjTask.TaskType+"','"+ifObjTask.FrontOperator+"',"+ifObjTask.FrontState+",'"+ifObjTask.StateUpdateTime+"','"+ifObjTask.Watcher+"','"+ifObjTask.Memo+"'";
            var sqlcmd = "call createtask ('"+ifObjTask.CaseNo+"','"+ifObjTask.CarMark+"','"+ifObjTask.CarOwner+"','"+ifObjTask.CarDriver+"','"+ifObjTask.Telephone+"','"+ifObjTask.Address+"',"+ifObjTask.EstPrice+","+ifObjTask.AuditPrice+","+ifObjTask.FixedPrice+","+ifObjTask.Latitude+","+ifObjTask.Longitude+",'"+ifObjTask.TaskType+"','"+ifObjTask.FrontOperator+"',"+ifObjTask.FrontState+",'"+ifObjTask.BackOperator+"',"+ifObjTask.BackState+",'"+ifObjTask.StateUpdateTime+"','"+ifObjTask.Watcher+"','"+ifObjTask.Memo+"');";
            //console.log(sqlcmd);
            sqlConn.queryData(sqlcmd,onSqlCallBack,_ifObj);
        }
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
        try{
        if(_result.data[0][0][0]==0)
            _ifObj.okStep = _ifObj.okStep + 1;
        else
            _ifObj.errStep = _ifObj.errStep + 1;
        } catch(err) {
            _ifObj.errStep = _ifObj.errStep + 1;
        }
    }
    else
        _ifObj.errStep = _ifObj.errStep + 1;

    if(_ifObj.okStep + _ifObj.errStep == _ifObj.taskList.length){
        if(_ifObj.errStep > 0)
        {
            sqlObj.code = "-1";
            sqlObj.cause = _result.msg +  _ifObj.taskList.length + '_ errStep = ' + _ifObj.errStep + ' _ okStep = '+ _ifObj.okStep;
            sqlObj.value = {};
            _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
            _ifObj.res.write(JSON.stringify(sqlObj));
            _ifObj.res.end();
        }else{
            sqlObj.code = "0";
            sqlObj.cause = "";
            sqlObj.value = {};
            _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
            _ifObj.res.write(JSON.stringify(sqlObj));
            _ifObj.res.end();
        }
    }
}

