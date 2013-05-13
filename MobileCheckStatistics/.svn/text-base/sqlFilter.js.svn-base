/* sqlFilter 数据库筛选器。
 *  根据config文件选择的数据库类型来设定数据库访问方式
 */

//1、从配置文件中获取数据库所用类型
var dbType = require('./config.js').dbType;

//2、建立数据库访问模型
var sqlObj = getSqlObj();

/*
 *数据库筛选器所需的返回对应的数据库连接模型
 */
function getSqlObj(){
    var sqlConn = null;
    switch (dbType)
    {
        case "mySql":sqlConn = require('./mySqlConn.js');break;
        case "msSqlServer":sqlConn = require('./msSqlServerConn.js');break;
        case "oracle":sqlConn = require('./oracleConn.js');break;
        default:break;
    }
    return sqlConn;
}


/*
 * 查询函数-返回json数据
 *
 * @param sqlcmd
 *  传入的sql语句
 *
 * @param ifName
 *  回调所对应的接口名称
 */
exports.queryData = function(sqlcmd,ifName)
{
    sqlObj.queryData(sqlcmd,ifName);
};


/*
 * 更新函数-返回受影响行数
 *
 * @param sqlcmd
 *  传入的sql语句
 *
 * @param ifName
 *  回调所对应的接口名称
 */
exports.updateData = function(sqlcmd,ifName)
{
    sqlObj.updateData(sqlcmd,ifName);
};
