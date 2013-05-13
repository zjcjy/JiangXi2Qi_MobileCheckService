/**
 * Created with JetBrains WebStorm.
 * 修改任务状态。
 * User: 陈瑾毅
 * Date: 13-4-15
 * Time: 16:00
 * To change this template use File | Settings | File Templates.
 */

//接口入口函数
exports.Main = function (_req,_res) {
    var ifObj= {
        req:null,
        res:null,
        accessToken:"",
        caseNo:"",
        sqlCmd:""
    };
    var jstb = require('./jsToolBox.js');
    var CaseNo,TaskID,TaskType,FrontOperator,UpdateFileds,UpdateValues,AccessToken;
    try{
        CaseNo = jstb.getParam(_req,"CaseNo");
    } catch (err) {}
    try{
        TaskID = jstb.getParam(_req,"TaskID");
    } catch (err) {}
    try{
        TaskType = jstb.getParam(_req,"TaskType");
    } catch (err) {}
    try{
        FrontOperator = jstb.getParam(_req,"FrontOperator");
    } catch (err) {}
    try{
        UpdateFileds = jstb.getParam(_req,"UpdateFileds");
    } catch (err) {}
    try{
        UpdateValues = jstb.getParam(_req,"UpdateValues");
    } catch (err) {}
    try{
        AccessToken = jstb.getParam(_req,"AccessToken");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.accessToken = AccessToken;
    ifObj.caseNo = CaseNo;
    var UpdateFiledsArray = UpdateFileds.split("|");
    var UpdateValuesArray = UpdateValues.split("|");
    if(UpdateFiledsArray.length != UpdateValuesArray.length)
    {
        var sqlObj = {
            code:"0",
            cause:"",
            value:{}
        };
        sqlObj.code = "-1";
        sqlObj.cause = "参数个数不一致。";
        sqlObj.value = {};
        _ifObj.res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
        _ifObj.res.write(JSON.stringify(sqlObj));
        _ifObj.res.end();
    }
    else
    {
        var sqlStr="update Task set ";
        for(var i= 0;i<UpdateFiledsArray.length;i++)
        {
            sqlStr += UpdateFiledsArray[i]+"='"+UpdateValuesArray[i]+"'";
            if(i<UpdateFiledsArray.length-1)
                sqlStr +=",";
        }
        sqlStr += "where CaseNo= '"+ifObj.caseNo+"' and TaskID = '"+TaskID+"' and TaskType = '"+TaskType+"' and FrontOperator = '"+FrontOperator+"'";
    ifObj.sqlCmd = sqlStr;

    //判断信令是否合法
        var at = require('./Interface_AccessToken.js');
        at.checkAccessToken(ifObj.accessToken,onAccessTokenCallBack,ifObj);
    }
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
        sqlConn.updateData(_ifObj.sqlCmd,onSqlCallBack,_ifObj);
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
        sqlObj.value = {};
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


