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
exports.dbType = "mySql";// mySql | msSqlServer | oracle


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
 * @param host
 *  数据对应的IP地址
 *
 * @param port
 *  数据库对应的端口号
 *
 * @param database
 *  数据库对应的数据库名称
 *
 * @param user
 *  数据库的登录账号
 *
 * @param password
 *  数据库的登录密码
 */
exports.dbConfig_mySql = {
    //mySql
    //host:"192.168.1.119",
    host:"127.0.0.1",
    port:"3306",
    database:"ClaimAssist",
    //user:"assist",
    user:"root",
    password:"ipcamera"
};



/*
 * Interface 接口相关参数
 *
 * @param interfaceList
 *  用于定义现有接口列表，不存在于列表中的接口将不会被调用。
 */
exports.ifConfig = {
    interfaceList:[
        "Login",//系统登录
        "GetSystemTask",//获得系统任务（未分配任务)。
        "GetMineTask",//获取我的任务
        "GetTaskByID",//领取任务
        ""
    ]
};


/*
 *  图片存放的路径(文件夹名称)
 */
exports.picsLocation = "pics";


/*
 *  百度推送服务用的对象
 *  参考 http://developer.baidu.com/wiki/index.php?title=docs/cplat/push/api/list#push_msg
 *
 * @param channel
 *  服务频道
 *
 * @param apikey
 *  访问令牌，明文AK，可从此值获得App的信息，配合sign中的sk做合法性身份认证。
 *
 * @param sign
 *  调用参数签名值，与apikey成对出现。
 *
 * @param channel
 *  服务频道
 *
 * @param channel
 *  服务频道
 */
exports.baiduPushObj = {
    host:"http://channel.api.duapp.com/rest/2.0/channel/channel",//安卓&IOS正式版
    //host:"http://channel.iOSpush.api.duapp.com/rest/2.0/channel/channel",//IOS测试版
    apikey:"OUkSyniVvkXeWEaOsTInm4qA",
    secret_key:"HL8kGkAEDmQOh2TX0NHlweQ5uebpGd0i"
};