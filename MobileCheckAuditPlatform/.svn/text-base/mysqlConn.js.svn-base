//mysqlConn.js

//创建数据库Client对象函数
function getClient(){
	var mq = require('mysql');
    var dbConfig = require('./config.js').dbConfig_mySql;
	var client = mq.createConnection(dbConfig);
	return client;
}

//queryData，查询函数，返回结果集
exports.queryData = function(sqlcmd,callback,_ifObj)
{
    //返回数据模型
    var sqlObj = {
        success:true,
        msg:"",
        data:[]
    };
    var client = getClient();
	client.query(sqlcmd,
        function selectDB(error, results, fields) {
           if (error) {
               console.log('GetData Error: ' + error.message);
               sqlObj.success = false;
               sqlObj.msg = error.message;
               sqlObj.data = [];
               callback(sqlObj,_ifObj);
           }
            sqlObj.success = true;
            sqlObj.msg = "";
            sqlObj.data = results;
            callback(sqlObj,_ifObj);
        }
    );
    client.end();
};

//updateData，更新数据库用函数，返回受影响函数
exports.updateData = function (sqlcmd,callback,_ifObj)
{
    //返回数据模型
    var sqlObj = {
        success:true,
        msg:"",
        data:[]
    };

	var client = getClient();
	client.query(sqlcmd,
        function updateDB(error, results, fields) {
           if (error) {
               console.log('GetData Error: ' + error.message);
               sqlObj.success = false;
               sqlObj.msg = error.message;
               sqlObj.data = [];
               callback(sqlObj,_ifObj);
           }
            sqlObj.success = true;
            sqlObj.msg = "";
            sqlObj.data = results["affectedRows"];
		   callback(sqlObj,_ifObj);
        }
    );
    client.end();
};