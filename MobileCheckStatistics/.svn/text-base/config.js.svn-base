/**
 * Created with JetBrains WebStorm.
 * User: 陈瑾毅
 * Date: 2013-04-11
 * Time: 下午6:04
 * Description：本文档为系统服务配置文件。
 * To change this template use File | Settings | File Templates.
 */

/*
 * DataBase 数据库相关配置
 */

/* 用于配置所需访问的数据库的类型
 *
 * @param dbType
 *  数据库类型 Example:mySql | msSqlServer | oracle
 */
exports.dbType = "msSqlServer";// mySql | msSqlServer | oracle


/*MS SqlServer配置
 *
 * @param mssql_Driver
 *  MS SQLSERVER对应node.js的驱动
 *
 * @param mssql_Server
 *  数据库对应的IP地址
 *
 * @param mssql_Database
 *  数据库对应的数据库名称
 *
 * @param mssql_UID
 *  数据库的登录账号
 *
 * @param mssql_PWD
 *  数据库的登录密码
 */
exports.dbConfig_msSqlServer = {

    //MS SqlServer
    mssql_Driver:"{SQL Server Native Client 11.0}",
    mssql_Server:"192.168.1.119",
    mssql_Database:"ClaimAssist",
    mssql_UID:"sa",
    mssql_PWD:"ipcamera"
};


/*mySql配置
 *
 * @param mySql_host
 *  数据对应的IP地址
 *
 * @param mySql_port
 *  数据库对应的端口号
 *
 * @param mySql_database
 *  数据库对应的数据库名称
 *
 * @param mySql_user
 *  数据库的登录账号
 *
 * @param mySql_password
 *  数据库的登录密码
 */
exports.dbConfig_mySql = {

    //mySql
    mySql_host:"192.168.1.119",
    mySql_port:"3306",
    mySql_database:"ClaimAssist",
    mySql_user:"root",
    mySql_password:"ipcamera"
};



/*
 * Interface 接口相关参数
 *
 * @param interfaceList
 *  用于定义现有接口列表，不存在于列表中的接口将不会被调用。
 */
exports.ifConfig = {
    interfaceList:[
        ""//发送GPS位置信息
    ]
};


/*
 *  图片存放的路径(文件夹名称)
 */
exports.picsLocation = "pics";