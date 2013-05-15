
/**
 * Created with JetBrains WebStorm.
 * 推送消息。
 * User: 陈瑾毅
 * Date: 13-4-28
 * Time: 14:20
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
        sqlCmd:""
    };
    var jstb = require('./jsToolBox.js');
    var UserName,Message;
    try{
        UserName = jstb.getParam(_req,"UserName");
    }catch (err){}
    try{
        Message = jstb.getParam(_req,"Message");
    }catch (err){}

    ifObj.req = _req;
    ifObj.res = _res;
    ifObj.userName = UserName;
    ifObj.message = Message;
    ifObj.sqlCmd = "select PushID from users where UserName = '"+ UserName +"'";

    var sqlConn = require('./sqlFilter.js');
    sqlConn.queryData(ifObj.sqlCmd,onSqlCallBack,ifObj);


};

//接口对应数据库输出回调函数
function onSqlCallBack(_result,_ifObj){
    var sqlObj = {
        code:"0",
        cause:"",
        value:{}
    };
    if(_result.success)
    {
        if(_result.data.length > 0)
        {
            sqlObj.code = "0";
            sqlObj.cause = "";
            sqlObj.value = "";

            //执行推送
            var baiduPushObj = require('./config.js').baiduPushObj;
            var pushTime = new Date().getTime();
            /*var timestamp =1368003702;// Math.floor(pushTime/1000);//必须每次从新获取时间

            var user_id = '1020751584199017546';

            //console.log(encodeURI('POST' + baiduPushObj.channel + 'apikey=' + baiduPushObj.apikey + 'messages="' + _ifObj.message + '"method=push_msgmsg_keys="' + _ifObj.userName + '_Push_At_' + pushTime + '"push_type=1timestamp=' + timestamp + 'user_id=' + user_id + 'v=1' + baiduPushObj.secret_key));
            _ifObj.message='test';
            var postdata=encodeURI('POST' + baiduPushObj.channel + 'apikey=' + baiduPushObj.apikey + 'message_type=0messages=' + _ifObj.message + 'method=push_msgmsg_keys=' + 'msgkey' + 'push_type=1timestamp=' + timestamp + 'user_id=' + user_id + baiduPushObj.secret_key);
            var md5sign = MD5Check(postdata).toLocaleUpperCase();
            console.log(md5sign);
            console.log(postdata);

            //var psUrl = baiduPushObj.channel + '?method=push_msg&apikey=' + baiduPushObj.apikey + '&sign=' + md5sign + '&timestamp=' + timestamp + '&v=1&push_type=1&user_id=' + user_id + '&messages="' + encodeURI(_ifObj.message) + '"&msg_keys="' + _ifObj.userName + '_Push_At_' + pushTime + '"';
            //console.log(psUrl);

            var psUrl = baiduPushObj.channel;
            var querystring = require('querystring');
            var postBody = querystring.stringify({
                apikey:baiduPushObj.apikey,
                messages:encodeURI(_ifObj.message),
                method:'push_msg',
                msg_keys:encodeURI(_ifObj.userName + '_Push_At_' + pushTime),
                push_type:1,
                sign:md5sign,
                timestamp:timestamp,
                user_id:user_id,
                v:1
            });
            //var postBody = encodeURI('apikey=' + baiduPushObj.apikey + '&messages=' +_ifObj.message+'"&method=push_msg&msg_keys='+_ifObj.userName+'_Push_At_' + pushTime + '&push_type=1&sign=' + md5sign + '&timestamp=' + timestamp + '&user_id=' + user_id);
            console.log(postBody);
            //SendPost(psUrl,postBody);
            */

            //执行推送
            var uid = _result.data[0]["PushID"];//
            //console.log(uid);
            uid='1020751584199017546';
            //uid='1175398671';
            var Push = require('BaiduPushNodejsServerSDK-master');
            (function() {
                var opt = {
                    ak: baiduPushObj.apikey,
                    sk: baiduPushObj.secret_key,
                    host: baiduPushObj.host
                };
                var client = new Push(opt);
                //queryBindList(client);
                pushMsg(client,uid,_ifObj.userName + '_Push_At_' + pushTime,_ifObj.message);
            })();

        }
        else
        {
            sqlObj.code = "-1";
            sqlObj.cause = "没找到对应的用户";
            sqlObj.value = {};
        }
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

function pushMsg(client,_uid,_msgKeys,_msgs) {
    var opt = {
        push_type: 1,
        user_id:  _uid,
        //channel_id:'4924894361583227587',
        messages: JSON.stringify(_msgs),
        msg_keys: JSON.stringify(_msgKeys)
    };
    client.pushMsg(opt, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    })
}


exports.ExecPushMsg = function(_ifObj,_userName,_msgKeys,_msgs){
    var ifObj2= {
        userName:"",
        sqlCmd:""
    };
    ifObj2.userName = _userName;
    ifObj2.message = _msgs;
    ifObj2.sqlCmd = "select PushID from users where UserName = '"+ _userName +"'";
    //console.log('pushmsg_'+ifObj2.sqlCmd);

    var sqlConn = require('./sqlFilter.js');
    sqlConn.queryData(ifObj2.sqlCmd,ExecOnSqlCallBack,ifObj2);
};

function ExecOnSqlCallBack(_result,_ifObj)
{
    if(_result.success)
    {
        if(_result.data.length > 0)
        {
    var baiduPushObj = require('./config.js').baiduPushObj;
    var pushTime = new Date().getTime();
    var uid = _result.data[0]["PushID"];//'1020751584199017546';
    //console.log(uid);
    var Push = require('BaiduPushNodejsServerSDK-master');
    (function() {
        var opt = {
            ak: baiduPushObj.apikey,
            sk: baiduPushObj.secret_key
        };
        var client = new Push(opt);
        //queryBindList(client);
        pushMsg(client,uid,_ifObj.userName + '_Push_At_' + pushTime,_ifObj.message);
    })();
        }
    }
}