//sqlConn.js
//MS SqlServer 版本

var sql = require('node-sqlserver');
var dbConfig = require('./config.js').dbConfig_msSqlServer;

//数据库对象，用于保存数据库各项参数
var dbObj = {
    Driver:dbConfig.mssql_Driver,
    Server:dbConfig.mssql_Server,
    Database:dbConfig.mssql_Database,
    UID:dbConfig.mssql_UID,
    PWD:dbConfig.mssql_PWD
};

//数据库连接串
var conn_str="Driver="+dbObj.Driver+";Server={"+dbObj.Server+"};Database={"+dbObj.Database+"};UID="+dbObj.UID+";PWD="+dbObj.PWD+";";

//queryData，查询函数，返回结果集
exports.queryData = function(sqlCmd,callback,_ifObj)
{
    //返回数据模型
    var sqlObj = {
        success:true,
        msg:"",
        data:[]
    };
    //console.log(sqlCmd);
    sql.open(conn_str, function (err, conn) {
        if (err) {
            console.log('数据库连接错误。');
            sqlObj.success = false;
            sqlObj.msg = "数据库连接错误。";
            sqlObj.data = [];
            callback(sqlObj,_ifObj);
        }
        sql.query(conn_str, sqlCmd, function (err, results) {
            if (err) {
                console.log(err.message);//数据查询错误
                sqlObj.success = false;
                sqlObj.msg = err.message;
                sqlObj.data = [];
                callback(sqlObj,_ifObj);
            }
            else {
                sqlObj.success = true;
                sqlObj.msg = "";
                sqlObj.data = results;
                callback(sqlObj,_ifObj);
                }
        });

    });
};

//updateData，更新数据库用函数，返回受影响行数
exports.updateData = function(sqlCmd,callback,_ifObj)
{
    //返回数据模型
    var sqlObj = {
        success:true,
        msg:"",
        data:[]
    };

    sql.open(conn_str, function (err, conn) {
        if (err) {
            console.log('数据库连接错误。');
            sqlObj.success = false;
            sqlObj.msg = "数据库连接错误。";
            sqlObj.data = [];
            callback(sqlObj,_ifObj);
        }

        sql.query(conn_str, sqlCmd, function (err, results) {
            if (err) {
                console.log(err.message);//数据查询错误
                sqlObj.success = false;
                sqlObj.msg = err.message;
                sqlObj.data = [];
                callback(sqlObj,_ifObj);
            }
            else {
                sqlObj.success = true;
                sqlObj.msg = "";
                sqlObj.data = results["affectedRows"];
                callback(sqlObj,_ifObj);
            }
        });

    });
};
